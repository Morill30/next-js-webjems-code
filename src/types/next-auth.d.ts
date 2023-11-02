import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    jwt?: string;
    id?: number;
    user?: {
      name?: string;
      email?: string;
      image?: string;
    };
  }
}
