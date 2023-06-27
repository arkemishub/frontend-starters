import { Client, TToken } from "@arkejs/client";
import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import * as process from "process";

const getServerUrl = () => {
  if (
    typeof window == "undefined" &&
    process.env.NEXT_PUBLIC_ARKE_SERVER_SSR_URL
  ) {
    return process.env.NEXT_PUBLIC_ARKE_SERVER_SSR_URL;
  }

  return process.env.NEXT_PUBLIC_ARKE_SERVER_URL;
};

export const getClient = (context?: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}): Client => {
  const serverUrl = getServerUrl();
  return new Client({
    serverUrl,
    project: process.env.NEXT_PUBLIC_ARKE_PROJECT,
    getSession: async () => {
      if (typeof window === "undefined" && context) {
        return getToken({ req: context?.req });
      }
      return getSession() as Promise<TToken>;
    },
  });
};
