import NextAuth from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user?: User;
    access_token?: string;
    refresh_token?: string;
  }

  interface User {
    id?: number;
    image?: string;
    email: string;
    first_name?: string;
    last_name?: string;
    project: string;
    access_token: string;
    refresh_token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: User;
    access_token: string;
    refresh_token: string;
  }
}
