import { TUnit } from "@arkejs/client";
import Todo from "./Todo";

export default function AllTodo({
  todos,
  onRefreshPage,
  onSetModal,
  onModal,
}: {
  todos: TUnit[];
  onRefreshPage: () => {};
  onSetModal: () => {};
  onModal: {};
}) {
  return (
    <>
      <div className="relative pt-2">
        <h1 className="absolute -top-1 px-4 bg-black text-white rounded-full z-50">
          Todos
        </h1>
        <ul className="relative flex space-x-6 overflow-y-auto pt-6 pb-8 border-t-2 border-black">
          {todos
            .filter((item) => item.done === false)
            .map((item) => (
              <li key={item.id}>
                <Todo
                  title={item.title}
                  description={item.description}
                  id={item.id}
                  done={item.done}
                  onRefreshPage={onRefreshPage}
                  onSetModal={onSetModal}
                  onModal={onModal}
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
          {todos
            .filter((item) => item.done === true)
            .map((item) => (
              <li key={item.id}>
                <Todo
                  title={item.title}
                  description={item.description}
                  id={item.id}
                  done={item.done}
                  onRefreshPage={onRefreshPage}
                  onSetModal={onSetModal}
                  onModal={onModal}
                />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
