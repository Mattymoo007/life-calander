import { ThymeData, User } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { updateThyme, updateUser } from '~/utils/db'

export default async function personHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
  } = req

  const { email, name, birthDate, totalTime } = req.body as Partial<
    User & ThymeData
  >

  const userData = {
    name,
    email,
  }

  const thymeData = {
    birthDate: new Date(birthDate as Date),
    totalTime: Number(totalTime),
  }

  const userRes = await updateUser(id as string, userData)
  const thymeRes = await updateThyme(id as string, thymeData)

  // User with id exists
  return Boolean(userRes && thymeRes)
    ? res.status(200).json({
        user: userRes,
        thyme: thymeRes,
      })
    : res.status(500).json({ message: 'Something went wrong' })
}
