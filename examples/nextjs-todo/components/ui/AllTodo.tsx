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
      <ul className="flex space-x-4 overflow-y-auto pb-6 border-b-2 border-black">
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
      <ul className="flex space-x-4 overflow-y-auto py-3 mt-3">
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
    </>
  );
}
