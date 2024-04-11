import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { FormConfigProvider } from "@arkejs/form";
import { Input } from "@arkejs/ui";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="bg-background text-background-contrast">
      <FormConfigProvider
        components={{
          string: ({ field }) => (
            <Input
              {...field}
              type="text"
              fullWidth
              onChange={(e) => field.onChange(e.target.value)}
            />
          ),
          default: (props: any) => (
            <div className="text-red-500">
              Type &quot;{props.type}&quot; not found
            </div>
          ),
        }}
      >
        <Component {...pageProps} />
      </FormConfigProvider>
    </main>
  );
}
