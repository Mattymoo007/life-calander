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

const MyThyme: NextPage<{ user: User; thymeData: ThymeData }> = ({
  user,
  thymeData,
}) => {
  const [selectedInterval, setSelectedInterval] = useState(intervalOptions[1])

  return (
    <div className="flex flex-col">
      {thymeData && (
        <div className="container aside-layout">
          {/* Aside */}
          <ThymeAside thymeData={thymeData} />

          {/* Calander display */}
          <div className="">
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
            <Calander
              thymeData={thymeData}
              selectedInterval={selectedInterval}
            />
          </div>
        </div>
      )}
    </div>
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
