import dayjs from 'dayjs'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

const Home = () => {
  const b = dayjs().add(-30, 'year').format('YYYY-MM-DD')

  return (
    <div>
      Home <span>{b}</span>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })

  if (session) {
    return {
      redirect: {
        destination: `/my-thyme/${session.user?.id}`,
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
