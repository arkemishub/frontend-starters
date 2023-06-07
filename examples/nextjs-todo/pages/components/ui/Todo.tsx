
export default function Todo({title, description, id}){
    return <div className="p-4 border border-black w-60 min-h-[250px]">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-2">{description}</p>
    </div>
}