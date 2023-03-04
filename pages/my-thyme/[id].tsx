import type { GetServerSideProps, NextPage } from 'next'
import Dropdown from '~/components/Dropdown'
import { useState } from 'react'
import Calander from '~/components/Calander'
import ThymeAside from '~/components/ThymeAside'
import { intervalOptions } from '~/utils/thyme-data'
import { getUserById } from '~/utils/db'
import { withAuth } from '~/utils/withAuth'

const MyThyme: NextPage<{ user: User }> = ({ user }) => {
  const [selectedInterval, setSelectedInterval] = useState(intervalOptions[1])

  return (
    <div className="flex flex-col">
      {user && (
        <div className="container aside-layout">
          {/* Aside */}
          <ThymeAside user={user} />

          {/* Calander display */}
          <div className="">
            <div className="flex items-center justify-center mb-10">
              <h2 className="font-medium spartan mr-3">
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
            <Calander user={user} selectedInterval={selectedInterval} />
          </div>
        </div>
      )}
    </div>
  )
}

export default MyThyme

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return withAuth(ctx, async () => {
    const user = await getUserById(String(ctx.params?.id))

    return {
      props: { user: JSON.parse(JSON.stringify(user)) },
    }
  })
}
