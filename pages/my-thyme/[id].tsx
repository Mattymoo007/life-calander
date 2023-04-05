import type { GetServerSideProps, NextPage } from 'next'
import Dropdown from '~/components/ui/Dropdown'
import { useState } from 'react'
import Calander from '~/components/Calander'
import ThymeAside from '~/components/ThymeAside'
import { intervalOptions } from '~/utils/thyme-data'
import { getThymeDataByUserId, getUserById } from '~/utils/db'
import { withAuth } from '~/utils/withAuth'
import { ThymeData, User } from '@prisma/client'
import { serialise } from '~/utils/serialise-response'
import { IoAccessibility, IoBook, IoSunny, IoVideocam } from 'react-icons/io5'

const MyThyme: NextPage<{ user: User; thymeData: ThymeData }> = ({
  user,
  thymeData,
}) => {
  const [selectedInterval, setSelectedInterval] = useState(intervalOptions[1])

  return (
    <>
      <section className="flex flex-col mb-14">
        {thymeData && (
          <div className="container aside-layout">
            {/* Aside */}
            <ThymeAside thymeData={thymeData} />

            {/* Calander display */}
            <div>
              <div className="flex items-center justify-center mb-10">
                <h2 className="font-normal spartan mr-3">
                  Hi {user?.name?.split(' ')[0]}, your current{' '}
                  <span className="text-primary">thyme</span> in
                </h2>
                <Dropdown
                  options={intervalOptions}
                  size="lg"
                  alignment="center"
                  label={selectedInterval.label}
                  menuClasses="text-center w-[130px] !text-lg"
                  onChange={(value: any) => setSelectedInterval(value)}
                />
              </div>

              {/* Calander */}
              <Calander
                thymeData={thymeData}
                selectedInterval={selectedInterval}
              />
            </div>
          </div>
        )}
      </section>

      {/* More stats */}
      {thymeData.hasPremium && (
        <section className="py-[60px] bg-gray-300 border-t-[6px] border-gray-400">
          <div className="w-[80%] flex mx-auto gap-[130px]">
            <div className="flex w-1/3 gap-3 flex-col text-center items-center">
              <IoBook className="text-3xl" />
              <h3 className="text-gray-700 text-3xl font-bold">300 books</h3>
              <p>
                You can still read 300 books in a year. Time to get reading!{' '}
                <strong>Want a list of ideas?</strong>
              </p>
            </div>

            <div className="flex w-1/3 gap-3 flex-col text-center items-center">
              <IoVideocam className="text-3xl" />
              <h3 className="text-gray-700 text-3xl font-bold">400 movies</h3>
              <p>
                You can still watch 400 movies in a year. Time to get watching!{' '}
                <strong>Check out these recommendations</strong>
              </p>
            </div>

            <div className="flex w-1/3 gap-3 flex-col text-center items-center">
              <IoSunny className="text-3xl" />
              <h3 className="text-gray-700 text-3xl font-bold">56 summers</h3>
              <p>
                You can still live 56 summers in a year. Time to get living!{' '}
                <strong>
                  Click here for awesome destinations in your area{' '}
                </strong>
              </p>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default MyThyme

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return withAuth(ctx, async () => {
    const userId = String(ctx.params?.id)
    const user = await getUserById(userId)
    const thymeData = await getThymeDataByUserId(userId)

    return {
      props: { user: serialise(user), thymeData: serialise(thymeData) },
    }
  })
}
