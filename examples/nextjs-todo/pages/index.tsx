import { useState } from "react";
import { withAuth } from "@/server/withAuth";
import { GetServerSideProps } from "next";

import { getClient } from "@/arke/getClient";
import useClient from "@/arke/useClient";
import { Client, TUnit } from "@arkejs/client";

import TodoInput from "../components/ui/TodoInput";
import Todo from "@/components/ui/Todo";
import { Button } from "@arkejs/ui";
import ArkeTodoTitle from "@/components/ui/ArkeTodoTitle";

export default function ArkeTodo({ todos }: { todos: TUnit[] }) {
  const [allTodos, setAllTodos] = useState(todos);
  const [modal, setModal] = useState({ isOpen: false, id: null });

  const client = useClient();

  async function getTodosData() {
    const response = await fetchAllTodos(client);
    setAllTodos(response.data.content.items);
  }

  return (
    <>
      <div className="relative p-12 h-screen">
        <header className="flex justify-between items-center space-x-2">
          <ArkeTodoTitle />
          <Button
            className="btn--secondary rounded-full"
            onClick={() => setModal({ ...modal, isOpen: true })}
          >
            Add todo
          </Button>
        </header>
        <main className="py-8">
          <div className="relative pt-2">
            <h1 className="absolute -top-1 px-4 bg-black text-white rounded-full z-50">
              Todos
            </h1>
            <ul className="relative flex space-x-6 overflow-y-auto pt-6 pb-8 border-t-2 border-black">
              {allTodos
                .filter((item) => item.done === false)
                .map((item) => (
                  <li key={item.id}>
                    <Todo
                      title={item.title}
                      description={item.description}
                      id={item.id}
                      done={item.done}
                      onRefreshPage={getTodosData}
                      onSetModal={setModal}
                      onModal={modal}
                    />
                  </li>
                ))}
            </ul>
          </div>
          <div className="relative pt-2">
            <h1 className="absolute top-2 px-4 bg-black text-white rounded-full z-50">
              Done
            </h1>
            <ul className="flex space-x-6 overflow-y-auto pt-6 mt-3 border-t-2 border-black">
              {allTodos
                .filter((item) => item.done === true)
                .map((item) => (
                  <li key={item.id}>
                    <Todo
                      title={item.title}
                      description={item.description}
                      id={item.id}
                      done={item.done}
                      onRefreshPage={getTodosData}
                      onSetModal={setModal}
                      onModal={modal}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </main>
      </div>
      {modal.isOpen && (
        <TodoInput
          onSetModal={setModal}
          onModal={modal}
          onRefreshPage={getTodosData}
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
