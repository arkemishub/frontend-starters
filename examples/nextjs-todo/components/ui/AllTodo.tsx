import { TUnit } from "@arkejs/client";
import Todo from "./Todo";

export default function AllTodo({
  todos,
  onRefreshPage,
}: {
  todos: TUnit[];
  onRefreshPage: () => {};
}) {
  return (
    <ul className="flex space-x-4 overflow-y-auto">
      {todos.map((item) => (
        <li key={item.id}>
          <Todo
            title={item.title}
            description={item.description}
            id={item.id}
            onRefreshPage={onRefreshPage}
          />
        </li>
      ))}
    </ul>
  );
}
