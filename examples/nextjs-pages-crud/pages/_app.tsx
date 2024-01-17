import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { FormConfigProvider, RenderProps } from "@arkejs/form";
import { Input } from "@arkejs/ui";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="bg-background text-background-contrast">
      <FormConfigProvider
        components={{
          string: (props) => (
            <Input
              {...props}
              type="text"
              fullWidth
              onChange={(e) => props.onChange(e.target.value)}
            />
          ),
          default: (props: RenderProps & { type: string }) => (
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
