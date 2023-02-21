import type { GetServerSideProps, NextPage } from "next";
import Dropdown from "~/components/Dropdown";
import { useState } from "react";
import prisma from "~/lib/prisma";
import Calander from "~/components/Calander";
import ThymeAside from "~/components/ThymeAside";
import { intervalOptions } from "~/utils/thyme-data";

const MyThyme: NextPage<{ user: User }> = ({ user }) => {
  const [selectedInterval, setSelectedInterval] = useState(intervalOptions[1]);

  return (
    <div className="bg-gray-50 py-12 grow flex flex-col">
      {user && (
        <div className="container grid grid-cols-[1fr_30%] gap-8">
          {/* Calander display */}
          <div className="">
            <div className="flex items-center justify-center mb-10">
              <h2 className="font-medium spartan mr-3">
                Hi {user?.name?.split(" ")[0]}, your current{" "}
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

          {/* Aside */}
          <ThymeAside user={user} />
        </div>
      )}
    </div>
  );
};

export default MyThyme;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: String(params?.id),
    },
  });

  return {
    props: { user: JSON.parse(JSON.stringify(user)) },
  };
};
