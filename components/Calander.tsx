import { FC } from "react";
import { initThymeData } from "~/utils/thyme-data";
import { motion } from "framer-motion";
import { calanderAnimate, calanderItemAnimate } from "~/utils/animations";

const Calander: FC<{ selectedInterval: IntervalOption; user: User }> = ({
  selectedInterval,
  user,
}) => {
  const { getCalanderItems } = initThymeData(user);

  const calanderWrapperClasses: AnyObject = {
    weeks: "w-[80%] gap-[5px]",
    months: "w-[80%] gap-[6px]",
    years: "w-[30%] gap-[6px]",
  };

  const itemClasses: AnyObject = {
    weeks: "w-[12px] h-[12px]",
    months: "w-[14px] h-[14px]",
    years: "w-[20px] h-[20px]",
  };

  const currentInterval = selectedInterval.value;

  return (
    <motion.div
      className={`flex flex-wrap mx-auto ${calanderWrapperClasses[currentInterval]}`}
      variants={calanderAnimate}
      initial="hidden"
      animate="show"
    >
      {getCalanderItems(selectedInterval.value).map(
        (item: CalanderOption, index: number) => {
          return (
            <motion.div
              variants={calanderItemAnimate}
              key={index}
              className={`rounded-full ${
                item.isLived ? "bg-primary/70" : "border border-primary/70"
              } ${itemClasses[currentInterval]}`}
            />
          );
        }
      )}
    </motion.div>
  );
};

export default Calander;
