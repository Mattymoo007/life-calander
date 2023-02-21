import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../lib/prisma";

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, {
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_ID ?? "",
        clientSecret: process.env.GITHUB_SECRET ?? "",
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID ?? "",
        clientSecret: process.env.GOOGLE_SECRET ?? "",
      }),
    ],

    adapter: PrismaAdapter(prisma),

    callbacks: {
      session: async ({ session, token }) => {
        if (session?.user) session.user.id = token.sub;
        return session;
      },
    },

    session: {
      strategy: "jwt",
    },

    secret: process.env.NEXT_AUTH_SECRET,
  });

export default authHandler;
