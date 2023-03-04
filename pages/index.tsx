import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

const Home = () => {
  return <div>Home</div>
}

export default Home

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })

  console.log('session', session)

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
