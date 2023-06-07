import { TUnit } from "@arkejs/client";
import Todo from "./Todo";

export default function AllTodo({todos} : {todos: TUnit[]}){
    return <ul className="flex space-x-4 overflow-y-auto">
        {todos.map((item)=> <li key={item.id}><Todo title={item.title} description={item.description} id={item.id}/></li>)}
    </ul>
};

