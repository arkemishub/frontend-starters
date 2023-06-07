export default function Home() {
  return <main></main>;
}

export const getServerSideProps: GetServerSideProps = withAuth(() => {
  return { props: {} };
});
