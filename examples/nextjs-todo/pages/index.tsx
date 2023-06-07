import { withAuth } from "@/server/withAuth";
import { GetServerSideProps } from "next";
import { Input, Button } from "@arkejs/ui";

export default function Home() {
  return <>
  <div className="p-8">
    <div className="flex space-x-2">
    <Input type="text" placeholder="write a new todo..."/>
    <Button className="btn--primary">Add todo</Button>
    </div>
  </div>
  </>;
}

export const getServerSideProps: GetServerSideProps = withAuth(() => {
  return { props: {} };
});
