import { withAuth } from "@/server/withAuth";
import { getClient } from "@/arke/getClient";
import { GetServerSideProps } from "next";
import { Input, Button } from "@arkejs/ui";
import { useState } from "react";

import AllTodo from "../components/ui/AllTodo";
import TodoInput from "../components/ui/TodoInput";
import { Client, TUnit } from "@arkejs/client";

export default function Home({ todos }: { todos: TUnit[] }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <div className="relative p-12 h-screen">
        <header className="flex justify-between items-center space-x-2 py-8 border-b border-black">
          <h1 className="text-2xl font-semibold">ARKE todo</h1>
          <Button
            className="btn--secondary"
            onClick={() => setIsModalVisible(true)}
          >
            Add todo
          </Button>
        </header>
        <main className="py-8">
          <AllTodo todos={todos} />
        </main>
      </div>
      {isModalVisible && <TodoInput onSetModal={setIsModalVisible} />}
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
