import React, { useState, useEffect } from "react";
import { BaseParameter, TBaseParameter, TStruct, TUnit } from "@arkejs/client";
import { FormConfigProvider, Form, FormField } from "@arkejs/form";
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
  const [editObj, setEditObj] = useState<TUnit>();

  const client = useClient();

  useEffect(() => {
    client.arke
      .struct("todo")
      .then((res) => setFields(res.data.content.parameters));

    if (onModal.id) {
      client.unit
        .get("todo", onModal.id)
        .then((res) => setEditObj(res.data.content));
    }
  }, []);

  const handleCreate = async (data: TUnit) => {
    client.unit
      .create("todo", data)
      .then((res) => onRefreshPage())
      .catch((e) => console.log("something went wrong"));

    onSetModal(false);
  };

  return (
    <div className="absolute top-0 h-screen w-screen bg-gray-300 opacity-90 flex justify-center items-center z-50">
      {fields && (
        <Form
          fields={fields}
          onSubmit={(values) => handleCreate(values)}
          onChange={(values) => {
            console.log(values);
          }}
          components={{
            string: (props) => <input {...props} type="text" />,
          }}
        >
          {({ fields }) => (
            <div className="space-y-6 p-8 rounded-xl bg-white">
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
    </div>
  );
}