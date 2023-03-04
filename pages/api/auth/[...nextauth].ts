import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '~/lib/prisma'
import { NextApiHandler } from 'next'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) session.user.id = token.uid
      return session
    },
    jwt: async ({ user, token }) => {
      if (user) token.uid = user.id
      return token
    },
  },
  session: {
    strategy: 'jwt',
  },
}

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, authOptions)

export default authHandler
