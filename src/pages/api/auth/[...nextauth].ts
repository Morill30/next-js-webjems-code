import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Session } from "next-auth/core/types";

export type SessionData = {
  data: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
};

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: { strategy: "jwt" },

  callbacks: {
    async session({ session, token }: { session: Session; token: any }) {
      session.jwt = token.jwt;
      session.id = token.id;
      return session;
    },

    async jwt({
      token,
      user,
      account,
    }: {
      user: any;
      token: any;
      account: any;
    }) {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${account?.provider}/callback?access_token=${account?.access_token}`
        );
        const data = await response.json();
        token.jwt = data.jwt;
        token.id = data.user.id;
      }
      return token;
    },
  },
} as any;

const Auth = (req: any, res: any) => NextAuth(req, res, options);

export default Auth;
