import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

const Home = () => {
  return <div>Home</div>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: `/my-thyme/${session.user?.id}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
