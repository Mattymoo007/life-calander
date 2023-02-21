import { FC } from "react";
import { initThymeData, IntervalOption } from "~/utils/thyme-data";

const Calander: FC<{ selectedInterval: IntervalOption; user: User }> = ({
  selectedInterval,
  user,
}) => {
  const thymeData: AnyObject = initThymeData(user);

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

  return (
    <div
      className={`flex flex-wrap mx-auto ${
        calanderWrapperClasses[selectedInterval.value]
      }`}
    >
      {thymeData.calanderItems?.[selectedInterval.value].map(
        (item: any, index: number) => {
          return item.isLived ? (
            <div
              key={index}
              className={`rounded-full bg-primary/70 ${
                itemClasses[selectedInterval.value]
              }`}
            />
          ) : (
            <div
              key={index}
              className={` rounded-full border border-primary/70 ${
                itemClasses[selectedInterval.value]
              }`}
            />
          );
        }
      )}
    </div>
  );
};

export default Calander;
