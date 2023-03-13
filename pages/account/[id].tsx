import { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'
import {
  IoArrowForwardSharp,
  IoArrowUpCircleOutline,
  IoLeaf,
} from 'react-icons/io5'

import AccountForm from '~/components/AccountForm'
import Modal from '~/components/Modal'
import { ThymeData, User } from '@prisma/client'
import { getThymeDataById, getUserById } from '~/utils/db'
import { withAuth } from '~/utils/withAuth'

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
              <li className="p-3 border-b border-primary/40">{user?.name}</li>
              <li className="p-3 ">{user?.email}</li>
            </ul>
          </div>

          <div
            className="card border-secondary bg-transparent p-3 flex items-center hover:bg-secondary/20 cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <IoLeaf className="text-secondary text-xl mr-3" />
            <p>Upgrade to Thyme premium!</p>
            <div className="grow" />
            <IoArrowForwardSharp className="text-secondary text-xl" />
          </div>
        </aside>

        {/* Profile details */}
        <AccountForm user={user} thymeData={thymeData} />
      </div>

      <Modal
        setIsVisible={(e: boolean) => setShowModal(e)}
        show={showModal}
        modalClasses="z-0 relative"
      >
        <div
          className="absolute w-full h-full left-0 top-0 z-[-1]"
          style={{
            backgroundImage:
              'linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0))',
          }}
        />
        <Image
          src="/img/purple-gradient.jpg"
          alt="premium"
          fill
          className="z-[-2] absolute top-0 left-0 w-full h-full"
          style={{
            objectFit: 'cover',
          }}
        />

        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-3 items-center text-center">
            <IoArrowUpCircleOutline className="text-secondary text-4xl" />
            <h3 className="underline underline-offset-2 decoration-secondary">
              Thyme premium
            </h3>
            <p>
              Upgrading to premium gives you access to more features. See more
              in depth details on how valuable you thyme is!
            </p>
          </div>

          <hr className="w-1/3 border-black/30 my-8" />

          <p className="text-xl font-semibold">Benefits:</p>

          <ul className="list-disc mt-4 marker:text-secondary">
            <li>
              Personalized learning plans based on individual goals and needs.
            </li>
            <li>One-on-one coaching with certified coaches.</li>
            <li>Advanced tracking and analytics for real-time feedback.</li>
            <li>Gamification and rewards for motivation and engagement.</li>
            <li>
              Exclusive communities and networking for support and
              collaboration.
            </li>
          </ul>

          <button className="btn btn-secondary btn-outline w-1/2 mt-8">
            Upgrade Now!
          </button>
        </div>
      </Modal>
    </div>
  )
}

export const getServerSideProps = async (ctx: any) => {
  return withAuth(ctx, async () => {
    const user = await getUserById(String(ctx.params?.id))
    const thymeData = await getThymeDataById(String(ctx.params?.id))

    return {
      props: { user: JSON.parse(JSON.stringify(user)), thymeData },
    }
  })
}

export default Account
