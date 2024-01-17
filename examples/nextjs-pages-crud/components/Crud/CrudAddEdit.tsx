import React, { ReactNode, useEffect, useState } from "react";
import useClient from "@/arke/useClient";
import { Form, FormField } from "@arkejs/form";
import useCrud from "@/hooks/useCrud";
import { TResponse, TUnit } from "@arkejs/client";
import { Button, Dialog, Spinner } from "@arkejs/ui";

export interface CrudProps {
  id?: string;
  arke: string;
  open: string | boolean | undefined;
  title: ReactNode;
  onClose(): void;
  onSubmit(data: TResponse<TUnit>): void;
}

export default function CrudAddEdit(props: CrudProps) {
  const client = useClient();
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const { arke, open, title, id, onClose } = props;
  const { onSubmit } = useCrud(arke, id, props.onSubmit);
  const exclude = [
    "id",
    "label",
    "active",
    "arke_id",
    "type",
    "metadata",
    "inserted_at",
    "updated_at",
    "parameters",
  ];

  useEffect(() => {
    if (open) {
      const promise = id
        ? client.unit.struct(arke, id, { params: { exclude } })
        : client.arke.struct(arke, { params: { exclude } });
      // Fields
      promise
        .then((res) => {
          setFields(res.data.content.parameters as any);
        })
        .finally(() => setLoading(false));
    }
  }, [open, id]);

  return (
    <Dialog open={!!open} title={title} onClose={onClose}>
      {fields.length > 0 ? (
        <Form onSubmit={onSubmit} style={{ height: "100%" }} fields={fields}>
          {({ fields }) =>
            loading ? (
              <div
                className="flex items-center justify-center"
                style={{ minHeight: 300 }}
              >
                <Spinner />
              </div>
            ) : (
              <>
                <div className="grid gap-4">
                  {fields.map((field) => (
                    <FormField key={field.id} id={field.id} />
                  ))}
                </div>
                <div className="mt-4 flex justify-between gap-4">
                  <Button
                    disabled={loading}
                    className="btn-outlined"
                    color="primary"
                    onClick={onClose}
                  >
                    Annulla
                  </Button>
                  <Button disabled={loading} color="primary" type="submit">
                    Conferma
                  </Button>
                </div>
              </>
            )
          }
        </Form>
      ) : (
        <Spinner />
      )}
    </Dialog>
  );
}
