import { Input } from "@arkejs/ui";

export default function TodoInput(){
    return <div className="absolute top-0 h-screen w-screen bg-white  opacity-90 flex justify-center items-center z-50">
        <div className="p-8 rounded-lg border border-black">
            <Input type="text" label="title" />
            <Input type="text" label="description" />
        </div>
    </div>
}