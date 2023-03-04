import { getServerSession } from 'next-auth/next'
import { authOptions } from '~/pages/api/auth/[...nextauth]'

export const withAuth = async (context: any, callback: Function) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: `/api/auth/signin`,
        permanent: false,
      },
    }
  }

  return callback({ session })
}
