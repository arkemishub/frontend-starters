import React, { useState, useEffect } from "react";
import { TBaseParameter, TUnit } from "@arkejs/client";
import { Form, FormField } from "@arkejs/form";
import useClient from "@/arke/useClient";
import { Button, Input } from "@arkejs/ui";

type ID = string;
export interface CrudState {
  add?: boolean;
  edit?: boolean | ID;
  delete?: boolean | ID;
}

export default function TodoInput({ onSetModal, onModal, onRefreshPage }: any) {
  const [fields, setFields] = useState<TBaseParameter[]>();

  const client = useClient();

  useEffect(() => {
    if (onModal.id) {
      client.unit
        .struct("todo", onModal.id)
        .then((res) => setFields(res.data.content.parameters));
    } else {
      client.arke
        .struct("todo")
        .then((res) => setFields(res.data.content.parameters));
    }
  }, []);

  const handleCreate = async (data: TUnit) => {
    client.unit
      .create("todo", data)
      .then((res) => onRefreshPage())
      .catch((e) => console.log("something went wrong", e));

    onSetModal(false);
  };

  const handleEdit = async (data: TUnit, id: string) => {
    client.unit
      .edit("todo", id, data)
      .then((res) => onRefreshPage())
      .catch((e) => console.log("something went wrong ", e));

    onSetModal(false);
  };

  return (
    <div className="absolute top-0 h-screen w-screen flex justify-center items-center z-50">
      {fields && (
        <Form
          fields={fields}
          onSubmit={(values) =>
            onModal.id ? handleEdit(values, onModal.id) : handleCreate(values)
          }
          components={{
            string: (props) => <input {...props} type="text" />,
          }}
        >
          {({ fields }) => (
            <div className="space-y-6 p-8 rounded-xl bg-white border-2 border-black">
              <FormField
                id="title"
                render={(props) => (
                  <Input
                    {...props}
                    className="w-full"
                    onChange={(e) => props.onChange(e.target.value)}
                    required
                  />
                )}
              />
              <FormField
                id="description"
                render={(props) => (
                  <Input
                    {...props}
                    className="w-full"
                    onChange={(e) => props.onChange(e.target.value)}
                    required
                  />
                )}
              />
              {onModal.id && (
                <FormField
                  id="done"
                  render={(props) => (
                    <div className="flex items-center space-x-2">
                      <Button
                        className={
                          "w-4 h-4 border-2 border-black rounded-none p-0"
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          props.onChange(!props.value);
                        }}
                      >
                        {props.value ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={4}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        ) : null}
                      </Button>
                      <p>Done</p>
                    </div>
                  )}
                />
              )}

              <div className="flex space-x-2">
                <Button className="btn--primary">
                  {onModal.id ? "Edit Todo" : "Add Todo"}
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    onSetModal(false);
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </Form>
      )}
      <div className="absolute h-screen w-screen bg-white opacity-90 -z-10"></div>
    </div>
  );
}
