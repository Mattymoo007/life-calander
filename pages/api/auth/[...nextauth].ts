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
    session: async ({ session, token, user }) => {
      if (session?.user) session.user.id = user.id
      return session
    },
  },

  events: {
    createUser: async ({ user }) => {
      // Get stripe id and save in user
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2022-11-15',
      })

      await stripe.customers
        .create({
          name: user.name!,
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

      const birthDate = dayjs().add(-30, 'year').format('YYYY-MM-DD')

      // Create default thyme data
      const defaultThymeData = {
        totalTime: 90,
        birthDate: new Date(birthDate),
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
