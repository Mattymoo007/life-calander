import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Image from 'next/image'

const Home = () => {
  return (
    <div className="container pb-14">
      <section className="bg-gradient-to-r from-primary to-blue-500 h-[300px] rounded-lg flex flex-col md:flex-row items-center justify-between overflow-hidden">
        <div className="md:w-1/2 px-[50px]">
          <h2 className="text-3xl font-bold text-white">
            Discover Your Life Stats
          </h2>
          <p className="text-white mt-4">
            Life Thyme is an innovative app that takes your birthdate and
            expected life span, and presents you with interesting stats based on
            these metrics. Get insights into how you have spent your life and
            what you can do with the remaining time.
          </p>
        </div>
        <div className="md:w-1/2 p-4 relative h-full">
          <Image
            src="/img/hourglass.jpg"
            alt="hourglass"
            fill
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      </section>

      <section className="mt-20">
        <h3 className="text-2xl font-bold mb-5">Why Life Thyme is Valuable</h3>
        <ul className="list-disc list-inside">
          <li className="mb-3">
            Gain a deeper understanding of your life, helping you make more
            informed decisions.
          </li>
          <li className="mb-3">
            Track your life&apos;s progress and achievements, celebrating
            milestones and accomplishments.
          </li>
          <li className="mb-3">
            Gain motivation to make the most of your time, by visualizing your
            remaining life span.
          </li>
        </ul>
      </section>

      <section className="mt-20">
        <h3 className="text-2xl font-bold mb-5">Get Started with Life Thyme</h3>
        <p className="mb-5">
          Are you ready to uncover your life stats? Join Life Thyme today and
          start exploring the insights that can help you make the most of your
          life.
        </p>
        <button className="btn btn-primary">Get Started</button>
      </section>
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
