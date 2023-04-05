import prisma from '~/lib/prisma'

const updateUserPremium = async (stripeId: string, hasPremium?: boolean) => {
  console.log('stripeId', stripeId)

  const user = await prisma.user.update({
    where: {
      stripeId: stripeId,
    },
    data: {
      thymeData: {
        update: {
          hasPremium: hasPremium,
        },
      },
    },
    include: {
      thymeData: true,
    },
  })
  return user
}

const createUser = async (email: string) => {
  const user = await prisma.user.create({
    data: { email },
  })
  return user
}

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: String(id),
    },
  })
  return user
}

const getThymeDataByUserId = async (id: string) => {
  const thymeData = await prisma.thymeData.findUnique({
    where: {
      userId: String(id),
    },
  })
  return thymeData
}

const updateUser = async (id: string, data: any) => {
  const user = await prisma.user.update({
    where: {
      id: String(id),
    },
    data,
  })
  return user
}

const updateThyme = async (id: string, data: any) => {
  const thymeData = await prisma.thymeData.update({
    where: {
      userId: String(id),
    },
    data,
  })
  return thymeData
}

export {
  createUser,
  updateUser,
  updateThyme,
  getUserById,
  getThymeDataByUserId,
  updateUserPremium,
}
