import { useState, useEffect } from "react";
import { Button } from "@arkejs/ui";
import useClient from "@/arke/useClient";
import { TBaseParameter, TUnit } from "@arkejs/client";
import { Form, FormField } from "@arkejs/form";

export default function Todo({
  title,
  description,
  id,
  done,
  onRefreshPage,
  onSetModal,
}) {
  const client = useClient();

  const [fields, setFields] = useState<TBaseParameter[]>();

  useEffect(() => {
    client.unit
      .struct("todo", id)
      .then((res) => setFields(res.data.content.parameters));
  }, []);

  const handleDelete = async () => {
    client.unit
      .delete("todo", id)
      .then((res) => onRefreshPage())
      .catch((e) => console.log("something went wrong"));
  };

  const handleCheck = async (data: TUnit) => {
    client.unit
      .edit("todo", id, data)
      .then((res) => onRefreshPage())
      .catch((e) => console.log("something went wrong"));
  };

  return (
    <div
      className={`relative p-4 border border-black border-b-4 border-l-4 rounded-bl-xl rounded-br-lg rounded-tr-md rounded-tl-lg w-60 min-h-[250px] ${
        done ? "bg-[#A8FBD7]" : "bg-white"
      }`}
    >
      {fields && (
        <Form
          fields={fields}
          onSubmit={(values) => handleCheck(values)}
          components={{
            string: (props) => <input {...props} type="text" />,
          }}
        >
          {({ fields }) => (
            <div>
              <FormField
                id="done"
                render={(props) => (
                  <Button
                    {...props}
                    onClick={(e) => {
                      props.onChange(!props.value);
                    }}
                    className="absolute border border-black p-0 w-6 h-6 rounded-full -top-2 -right-2 bg-white"
                  >
                    {done ? (
                      <div className="bg-black w-3 h-3 rounded-full" />
                    ) : null}
                  </Button>
                )}
              />
            </div>
          )}
        </Form>
      )}

      {done ? (
        <del>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="font-light mt-2">{description}</p>
        </del>
      ) : (
        <>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="font-light mt-2">{description}</p>
        </>
      )}

      <div className="absolute flex bottom-2 right-0">
        <Button
          onClick={() => onSetModal({ isOpen: true, id: id })}
          className="p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </Button>
        <Button onClick={() => handleDelete()} className="p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </Button>
      </div>
    </div>
  );
}
