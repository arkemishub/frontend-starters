import { withAuth } from "@/server/withAuth";
import { getClient } from "@/arke/getClient";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Button } from "@arkejs/ui";
import { useState } from "react";

import AllTodo from "../components/ui/AllTodo";
import TodoInput from "../components/ui/TodoInput";
import { Client, TUnit } from "@arkejs/client";

export default function Home({ todos }: { todos: TUnit[] }) {
  const [modal, setModal] = useState({ isOpen: false, id: null });
  const router = useRouter();

  const refreshData = () => router.replace(router.asPath);

  return (
    <>
      <div className="relative p-12 h-screen">
        <header className="flex justify-between items-center space-x-2 pb-4 ">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-y-[3px] border-black flex justify-center items-center">
              <div className="w-1.5 h-1.5 bg-black rounded-full" />
            </div>
            <h1 className="text-3xl font-bold">ARKE todo</h1>
          </div>
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
