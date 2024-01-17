import useClient from "@/arke/useClient";
import { toast } from "react-toastify";
import { TResponse, TUnit } from "@arkejs/client";

export default function useCrud(
  arke: string,
  unit: string | undefined,
  callback: (data: TResponse<TUnit>) => void
) {
  const client = useClient();
  function onSubmit(data: Record<string, unknown>) {
    const promise = !unit
      ? client.unit.create(arke, data)
      : client.unit.edit(arke, unit as string, data);
    promise.then(
      (res) => callback(res),
      (err) =>
        err.response.data.messages.forEach((item: { message: string }) =>
          toast.error(item.message)
        )
    );
  }
  return { onSubmit };
}
