import { checkAuth } from "@/server/auth";

export default async function Home() {
  await checkAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      Homepage
    </main>
  );
}
