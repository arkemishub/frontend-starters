import Image from "next/image";
import { GetServerSideProps } from "next";
import { withAuth } from "@/server/withAuth";
import { Input } from "@arkejs/ui";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [value, setValue] = useState("");

  return (
    <div className="min-h-screen max-w-5xl mx-auto flex flex-col justify-between items-center py-16 px-4">
      <Image src="/arke.svg" alt="Arke Logo" width={180} height={40} priority />
      <div className="flex flex-col items-center gap-4">
        <p className="text-center">
          Start by creating your Arke on the console. <br />
          You can then navigate to <code>{`/manage/<arke_id>`}</code> page and
          see an example of CRUD.
        </p>

        <div className="flex gap-4">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Arke ID"
          />
          <Link className="btn btn--primary" href={`/manage/${value}`}>
            Manage
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <a
          className="mt-4 flex flex-col gap-2 border p-4 border-transparent rounded-theme transition-all hover:border-primary"
          href="https://arkemishub.github.io/docs/introduction"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-file-text"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" x2="8" y1="13" y2="13" />
            <line x1="16" x2="8" y1="17" y2="17" />
            <line x1="10" x2="8" y1="9" y2="9" />
          </svg>

          <p className="font-semibold mt-2 text-lg">Docs</p>
          <p className="text-sm text-neutral">
            Discover our comprehensive Arke Documentation. Dive in and unlock
            the knowledge you need to build exceptional applications
            effortlessly.
          </p>
        </a>
        <a
          className="mt-4 flex flex-col gap-2 border p-4 border-transparent rounded-theme transition-all hover:border-primary"
          href="https://arkemishub.github.io/docs/introduction"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-book-copy"
          >
            <path d="M2 16V4a2 2 0 0 1 2-2h11" />
            <path d="M5 14H4a2 2 0 1 0 0 4h1" />
            <path d="M22 18H11a2 2 0 1 0 0 4h11V6H11a2 2 0 0 0-2 2v12" />
          </svg>

          <p className="font-semibold mt-2 text-lg">Templates</p>
          <p className="text-sm text-neutral">
            Effortlessly kickstart your app development journey with our
            extensive Template Collection. Explore a variety of templates and
            accelerate your project setup process.
          </p>
        </a>
        <div className="flex flex-col p-4">
          <p className="font-semibold text-lg mt-4">Join the community!</p>
          <div className="grow grid grid-rows-2 gap-4 mt-4">
            <a
              href="https://github.com/arkemishub"
              target="_blank"
              className="flex items-center gap-4 border py-2 px-4 border-transparent rounded-theme transition-all hover:border-primary"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 0C5.374 0 0 5.373 0 12C0 17.302 3.438 21.8 8.207 23.387C8.806 23.498 9 23.126 9 22.81V20.576C5.662 21.302 4.967 19.16 4.967 19.16C4.421 17.773 3.634 17.404 3.634 17.404C2.545 16.659 3.717 16.675 3.717 16.675C4.922 16.759 5.556 17.912 5.556 17.912C6.626 19.746 8.363 19.216 9.048 18.909C9.155 18.134 9.466 17.604 9.81 17.305C7.145 17 4.343 15.971 4.343 11.374C4.343 10.063 4.812 8.993 5.579 8.153C5.455 7.85 5.044 6.629 5.696 4.977C5.696 4.977 6.704 4.655 8.997 6.207C9.954 5.941 10.98 5.808 12 5.803C13.02 5.808 14.047 5.941 15.006 6.207C17.297 4.655 18.303 4.977 18.303 4.977C18.956 6.63 18.545 7.851 18.421 8.153C19.191 8.993 19.656 10.064 19.656 11.374C19.656 15.983 16.849 16.998 14.177 17.295C14.607 17.667 15 18.397 15 19.517V22.81C15 23.129 15.192 23.504 15.801 23.386C20.566 21.797 24 17.3 24 12C24 5.373 18.627 0 12 0Z"
                  fill="white"
                />
              </svg>
              <p>Github</p>
            </a>
            <a
              href="https://discord.gg/mRcaQGHq5M"
              target="_blank"
              className="flex items-center gap-4 border py-2 px-4 border-transparent rounded-theme transition-all hover:border-primary"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M27.107 5.63708C25.0356 4.66791 22.8208 3.96356 20.5052 3.5625C20.2208 4.07665 19.8886 4.76819 19.6595 5.3183C17.198 4.94812 14.7591 4.94812 12.3429 5.3183C12.1139 4.76819 11.7741 4.07665 11.4871 3.5625C9.16908 3.96356 6.95167 4.6705 4.88026 5.64221C0.70219 11.9558 -0.430415 18.1126 0.135889 24.182C2.907 26.2514 5.59255 27.5085 8.23277 28.3311C8.88465 27.4339 9.46605 26.4802 9.9669 25.475C9.013 25.1126 8.09937 24.6653 7.2361 24.146C7.46512 23.9763 7.68914 23.7989 7.90557 23.6164C13.1709 26.0791 18.8919 26.0791 24.0943 23.6164C24.3133 23.7989 24.5373 23.9763 24.7638 24.146C23.898 24.6678 22.9818 25.1151 22.0279 25.4776C22.5288 26.4802 23.1077 27.4365 23.7621 28.3336C26.4048 27.511 29.0929 26.254 31.864 24.182C32.5285 17.146 30.7289 11.0458 27.107 5.63708ZM10.6842 20.4494C9.10363 20.4494 7.8074 18.9738 7.8074 17.1769C7.8074 15.38 9.07595 13.9018 10.6842 13.9018C12.2926 13.9018 13.5887 15.3774 13.5611 17.1769C13.5636 18.9738 12.2926 20.4494 10.6842 20.4494ZM21.3157 20.4494C19.735 20.4494 18.4388 18.9738 18.4388 17.1769C18.4388 15.38 19.7073 13.9018 21.3157 13.9018C22.9239 13.9018 24.2202 15.3774 24.1925 17.1769C24.1925 18.9738 22.9239 20.4494 21.3157 20.4494Z"
                  fill="white"
                />
              </svg>
              <p>Discord</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withAuth(() => {
  return { props: {} };
});
