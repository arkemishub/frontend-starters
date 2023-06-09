import { withAuth } from "@/server/withAuth";
import { getClient } from "@/arke/getClient";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Button } from "@arkejs/ui";
import { useState } from "react";

import AllTodo from "../components/ui/AllTodo";
import TodoInput from "../components/ui/TodoInput";
import { Client, TUnit } from "@arkejs/client";
import ArkeTodoTitle from "@/components/ui/ArkeTodoTitle";

export default function Home({ todos }: { todos: TUnit[] }) {
  const [modal, setModal] = useState({ isOpen: false, id: null });
  const router = useRouter();

  const refreshData = () => router.replace(router.asPath);

  return (
    <>
      <div className="relative p-12 h-screen">
        <header className="flex justify-between items-center space-x-2 pb-4 ">
          <ArkeTodoTitle />
          <Button
            className="btn--secondary"
            onClick={() => setModal({ ...modal, isOpen: true })}
          >
            Add todo
          </Button>
        </header>
        <main className="py-8">
          <AllTodo
            todos={todos}
            onRefreshPage={refreshData}
            onSetModal={setModal}
            onModal={modal}
          />
        </main>
      </div>
      {modal.isOpen && (
        <TodoInput
          onSetModal={setModal}
          onModal={modal}
          onRefreshPage={refreshData}
        />
      )}
    </>
  );
}

const fetchAllTodos = (client: Client) => client.unit.getAll("todo");

export const getServerSideProps: GetServerSideProps = withAuth(
  async (context) => {
    const client = getClient(context);
    try {
      const response = await fetchAllTodos(client);

      return {
        props: {
          todos: response.data.content.items,
        },
      };
    } catch (e) {
      return {
        redirect: {
          destination: "/404",
          permanent: false,
        },
      };
    }
  }
);
