import { Form, FormField } from "@arkejs/form";
import useStruct from "@/hooks/useStruct";
import useCrud from "@/hooks/useCrud";
import useClient from "@/arke/useClient";

import { Dialog, Button } from "@arkejs/ui";
import { Loader } from "next/dynamic";

export function ProductCrud(props: CrudProps) {
  const client = useClient();
  const { open, title, id, onClose } = props;
  const { fields, loading } = useStruct(arke, id, open as boolean);
  const { onSubmit } = useCrud("product", id, props.onSubmit);

  return (
    <Dialog open={!!open} title={title} onClose={onClose}>
      <Form fields={fields} onSubmit={onSubmit}>
        {() =>
          loading ? (
            <Loader />
          ) : (
            <>
              <Container>
                <FormField
                  id={"image"}
                  render={(props) => <ProductImage {...props} />}
                />
                <FormField id={"name"} />
                <FormField id={"slug"} />
                <FormField id={"product_type"} />
                <FormField id={"price"} />
                <FormField id={"description"} />
              </Container>
              <Action>
                <Button disabled={loading} variant="outlined" onClick={onClose}>
                  Annulla
                </Button>
                <Button disabled={loading} variant="contained" type="submit">
                  Conferma
                </Button>
              </Action>
            </>
          )
        }
      </Form>
    </Dialog>
  );
}
