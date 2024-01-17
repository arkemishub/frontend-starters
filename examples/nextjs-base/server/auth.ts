import CredentialsProvider from "next-auth/providers/credentials";
import { getClient } from "@/arke/getClient";
import { Client, HTTPStatusCode } from "@arkejs/client";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";

const refreshToken = async (client: Client, token: JWT): Promise<JWT> => {
  return new Promise((resolve) =>
    client.auth
      .refreshToken(token.refresh_token as string)
      .then((res) => resolve({ ...token, ...res.data }))
      .catch((e) => {
        resolve({ ...token, error: "RefreshTokenError" });
      })
  );
};

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials) {
          const client = getClient();
          const authRes = await client.auth.signIn(
            {
              username: credentials.username,
              password: credentials.password,
            },
            "credentials"
          );

          // If no error and we have user data, return it
          if (authRes.status === HTTPStatusCode.OK && authRes.data.content) {
            return { ...authRes.data.content };
          }
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account && account.type === "credentials") {
        token.id = account.providerAccountId; // this is ID that coming from authorize() callback
        token.access_token = user.access_token;
        token.refresh_token = user.refresh_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/login",
  },
  session: { strategy: "jwt" },
} satisfies NextAuthOptions;

const getServerAuthSession = () => getServerSession(authOptions);

async function checkAuth() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/login");
  }
}

export { authOptions, checkAuth, getServerAuthSession };
