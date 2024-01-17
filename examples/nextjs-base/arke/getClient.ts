import { Client, TToken } from "@arkejs/client";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

export const getClient = (): Client => {
  return new Client({
    serverUrl: process.env.NEXT_PUBLIC_ARKE_SERVER_URL,
    project: process.env.NEXT_PUBLIC_ARKE_PROJECT,
    getSession: async () => {
      if (typeof window === "undefined") {
        return getServerSession(authOptions);
      }
      return (await getSession()) as TToken;
    },
  });
};
