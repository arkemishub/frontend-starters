import { useState } from "react";
import { withAuth } from "@/server/withAuth";
import { GetServerSideProps } from "next";

import { getClient } from "@/arke/getClient";
import useClient from "@/arke/useClient";
import { Client, TUnit } from "@arkejs/client";

import TodoForm from "../components/ui/TodoForm";
import Todo from "@/components/ui/Todo";
import { Button } from "@arkejs/ui";

export default function ArkeTodo({ todos }: { todos: TUnit[] }) {
  const [allTodos, setAllTodos] = useState(todos);
  const [activeTodoId, setActiveTodoId] = useState<string | undefined>(
    undefined
  );
  const [open, setOpen] = useState(false);

  const client = useClient();

  async function getTodosData() {
    const response = await fetchAllTodos(client);
    setAllTodos(response.data.content.items);
  }

  function handleOpenModal() {
    setOpen(true);
    setActiveTodoId("");
  }

  function handleSubmit() {
    setActiveTodoId(undefined);
    getTodosData();
  }

  return (
    <>
      <div className="relative p-12 h-screen">
        <header className="flex justify-between items-center space-x-2">
          <>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-y-[3px] border-black flex justify-center items-center">
                <div className="w-1.5 h-1.5 bg-black rounded-full" />
              </div>
              <h1 className="text-3xl font-bold">ARKE todo</h1>
            </div>
          </>
          <Button
            className="btn--secondary rounded-full"
            onClick={() => handleOpenModal()}
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
                      onClose={setOpen}
                      onSubmit={handleSubmit}
                      isOpen={open}
                      activeTodoId={activeTodoId}
                      setActiveTodoId={setActiveTodoId}
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
                      onClose={setOpen}
                      onSubmit={handleSubmit}
                      isOpen={open}
                      setActiveTodoId={setActiveTodoId}
                      activeTodoId={activeTodoId}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </main>
      </div>
      {open && (
        <TodoForm
          onClose={setOpen}
          isOpen={open}
          onSubmit={handleSubmit}
          activeTodoId={activeTodoId}
          setActiveTodoId={setActiveTodoId}
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
