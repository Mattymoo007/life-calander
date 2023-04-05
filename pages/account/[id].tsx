import { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import { IoArrowForwardSharp, IoLeaf } from 'react-icons/io5'

import AccountForm from '~/components/account/AccountForm'
import { ThymeData, User } from '@prisma/client'
import { getThymeDataByUserId, getUserById } from '~/utils/db'
import { withAuth } from '~/utils/withAuth'
import { serialise } from '~/utils/serialise-response'
import UpgradeModal from '~/components/UpgradeModal'

const Account: NextPage<{ user: User; thymeData: ThymeData }> = ({
  user,
  thymeData,
}) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="relative">
      <div className="container aside-layout items-start">
        {/* Profile overview */}
        <aside className="flex flex-col gap-6">
          <div className="card card-primary overflow-hidden">
            <div className="relative bg-primary/20 w-full flex justify-center py-5">
              <Image
                src={user?.image ?? ''}
                alt="user-profile"
                width={100}
                height={100}
                className="rounded-full -top-5 -left-5 border-4 border-white ring-1 ring-primary/60"
              />
            </div>
            <ul className="flex flex-col">
              <li className="p-4 border-b border-primary/40">{user?.name}</li>
              <li className="p-4">{user?.email}</li>
            </ul>
          </div>

          {thymeData.hasPremium ? (
            <div
              className="card border-secondary bg-transparent p-4 flex flex-col items-center"
              onClick={() => setShowModal(true)}
            >
              <IoLeaf className="text-secondary text-2xl mr-3 mb-3" />
              <p>You are currently on Thyme Premium!</p>

              <button className="btn w-full mt-5">Cancel subscription</button>
            </div>
          ) : (
            <div
              className="card border-secondary bg-transparent p-3 flex items-center hover:bg-secondary/20 cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <IoLeaf className="text-secondary text-xl mr-3" />
              <p>Upgrade to Thyme premium!</p>
              <div className="grow" />
              <IoArrowForwardSharp className="text-secondary text-xl" />
            </div>
          )}
        </aside>

        {/* Profile details */}
        <AccountForm user={user} thymeData={thymeData} />
      </div>

      <UpgradeModal
        showModal={showModal}
        setShowModal={setShowModal}
        user={user}
      />
    </div>
  )
}

export const getServerSideProps = async (ctx: any) => {
  return withAuth(ctx, async () => {
    const userId = String(ctx.params?.id)
    const user = await getUserById(userId)
    const thymeData = await getThymeDataByUserId(userId)

    return {
      props: { user: serialise(user), thymeData: serialise(thymeData) },
    }
  })
}

export default Account
