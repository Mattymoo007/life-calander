import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '~/lib/prisma'
import { NextApiHandler } from 'next'
import { Stripe } from 'stripe'
import dayjs from 'dayjs'

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
    session: async ({ session, user }) => {
      if (session?.user) session.user.id = user.id
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
  events: {
    createUser: async ({ user }) => {
      // Get stripe id and save in user
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2022-11-15',
      })

      await stripe.customers
        .create({
          email: user.email!,
        })
        .then(async (customer) => {
          return prisma.user.update({
            where: { id: user.id },
            data: {
              stripeId: customer.id,
            },
          })
        })

      // Create default thyme data
      const defaultThymeData = {
        totalTime: 90,
        birthDate: dayjs().add(-30, 'year').format('YYYY-MM-DD'),
        userId: user.id,
        hasPremium: false,
      }

      await prisma.thymeData.create({
        data: defaultThymeData,
      })
    },
  },
}

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, authOptions)

export default authHandler
