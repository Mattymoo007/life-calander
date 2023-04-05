import { User } from '@prisma/client'
import Image from 'next/image'
import { FC, MouseEventHandler, useState } from 'react'
import { IoArrowUpCircleOutline } from 'react-icons/io5'
import { fetchPostJSON } from '~/utils/api-helpers'
import getStripe from '~/utils/stripe'
import Modal from './ui/Modal'

const UpgradeModal: FC<{
  showModal: boolean
  setShowModal: Function
  user: User
}> = ({ showModal, setShowModal, user }) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit: MouseEventHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    const response = await fetchPostJSON('/api/checkout_sessions', {
      userId: user.id,
      name: user.name,
      email: user.email,
      stripeId: user.stripeId,
      amount: 20,
    })

    if (response.statusCode === 500) {
      console.error(response.message)
      return
    }

    const stripe = await getStripe()
    const { error } = await stripe!.redirectToCheckout({
      sessionId: response.id,
    })

    console.warn(error.message)
    setLoading(false)
  }

  return (
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
            Upgrading to premium gives you access to more features. See more in
            depth details on how valuable you thyme is!
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
            Exclusive communities and networking for support and collaboration.
          </li>
        </ul>

        <button
          className="btn btn-secondary btn-outline w-1/2 mt-8"
          onClick={(e) => handleSubmit(e)}
        >
          {loading ? 'Redirecting to checkout ...' : 'Upgrade Now!'}
        </button>
      </div>
    </Modal>
  )
}

export default UpgradeModal
