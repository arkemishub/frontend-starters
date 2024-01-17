import React from "react";
import useClient from "@/arke/useClient";
import { Button, Dialog } from "@arkejs/ui";

export interface DeleteProps {
  id?: string;
  arke: string;
  open: string | boolean | undefined;
  title: string;
  onClose(): void;
  onBeforeSubmit?(): Promise<any>;
  onSubmit(data: any): void;
}

export default function CrudDelete(props: DeleteProps) {
  const client = useClient();
  const { arke, id, open, title, onClose, onBeforeSubmit, onSubmit } = props;

  function onDelete() {
    function onSubmitCallback() {
      client.unit.delete(arke, id as string).then((res) => {
        onSubmit(res);
      });
    }

    if (onBeforeSubmit) {
      onBeforeSubmit().then(onSubmitCallback);
    } else {
      onSubmitCallback();
    }
  }

  return (
    <Dialog open={!!open} title={title} onClose={onClose}>
      <p className="text-sm">Sei sicuro di voler continuare?</p>
      <div className="mt-4 flex justify-between">
        <Button color="primary" className="btn-outlined" onClick={onClose}>
          Annulla
        </Button>
        <Button color="primary" onClick={onDelete}>
          Conferma
        </Button>
      </div>
    </Dialog>
  );
}
