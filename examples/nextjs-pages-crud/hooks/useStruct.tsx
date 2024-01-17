import useClient from "@/arke/useClient";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { TStruct } from "@arkejs/client";

const exclude = [
  "id",
  "active",
  "arke_id",
  "type",
  "metadata",
  "inserted_at",
  "updated_at",
  "parameters",
];

export default function useStruct(arke: string, unit?: string | undefined) {
  const [loading, setLoading] = useState(false);
  const [parameters, setParameters] = useState<TStruct["parameters"]>([]);
  const client = useClient();

  useEffect(() => {
    setLoading(true);
    const promise = !unit
      ? client.arke.struct(arke, { params: { exclude } })
      : client.unit.struct(arke, unit as string, { params: { exclude } });
    promise
      .then(
        (res) => {
          setParameters(res.data.content.parameters);
        },
        (err) =>
          err.response.data.messages.forEach((item: { message: string }) =>
            toast.error(item.message)
          )
      )
      .finally(() => setLoading(false));
  }, [unit]);

  return { loading, parameters };
}
