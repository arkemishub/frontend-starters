import { useEffect, useState } from "react";
import useClient from "@/arke/useClient";
import { Field } from "@arkejs/form";

export default function useStruct(
  arke: string,
  unit: string | undefined,
  open: boolean
) {
  const client = useClient();
  const exclude = ["id", "arke_id"];
  const [loading, setLoading] = useState<boolean>(true);
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    if (open) {
      setLoading(true);
      const getStruct = () =>
        unit
          ? client.unit.struct(arke, unit, {
              params: { exclude },
            })
          : client.arke.struct(arke, {
              params: { exclude },
            });

      getStruct()
        .then((res) => setFields(res.data.content.parameters))
        .catch((e) => console.error(e))
        .finally(() => setLoading(false));
    }
  }, [open]);

  return { fields, loading };
}
