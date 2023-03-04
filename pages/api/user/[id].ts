import { NextApiRequest, NextApiResponse } from 'next'
import { updateUser } from '~/utils/db'

export default async function personHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
  } = req

  console.log('id', id)

  const data = await updateUser(id, req.body)

  console.log('data', data)

  // User with id exists
  return data ? res.status(200) : res.status(500)
}
