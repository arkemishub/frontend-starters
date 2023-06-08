import { BaseParameter, TBaseParameter } from "@arkejs/client";
import { FormConfigProvider, Form, FormField } from "@arkejs/form";
import { Button, Input } from "@arkejs/ui";
import React, { useCallback, useState } from "react";

const fields: Array<TBaseParameter & Record<string, unknown>> = [
  {
    label: "title",
    id: "title",
    type: BaseParameter.String,
    placeholder: "Todo Title",
  },
  {
    label: "description",
    id: "description",
    type: BaseParameter.String,
    placeholder: "Todo Description",
  },
];

const handleSubmit = () => console.log("submit");

export default function TodoInput({ setModal }: any) {
  return (
    <div className="absolute top-0 h-screen w-screen bg-gray-300 opacity-90 flex justify-center items-center z-40">
      <Form
        fields={fields}
        onSubmit={(values) => console.log(values)}
        onChange={(values) => {}}
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
              <Button className="btn--primary">Add Todo</Button>
              <Button>Cancel</Button>
            </div>
          </div>
        )}
      </Form>
    </div>
  );
}

// <Form fields={fields} onSubmit={handleSubmit}>
// {() => (
//   <div className="space-y-8">
//     <FormField
//       id="title"
//       render={(props) => (
//         <Input
//           {...props}
//           label='Title'
//           className="w-full"
//           onChange={(e) => setData({...data, title: e.target.value})}
//           required
//         />
//       )}
//     />
//     <FormField
//       id="description"
//       render={(props) => (
//         <Input
//           {...props}
//           label='Description'
//           className="w-full"
//           onChange={(e) => setData({...data, description: e.target.value})}
//         />
//       )}
//     />

//     <div className="flex space-x-2">
//     <Button className="btn--primary" type="submit" onClick={()=> console.log(data)}>
//       add todo
//     </Button>
//     <Button className="" onClick={()=> setModal(false)}>
//       cancel
//     </Button>
//     </div>
//   </div>
// )}
// </Form>
