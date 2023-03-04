import { initThymeData } from "~/utils/thyme-data";
import { FC } from "react";
import AsideCard from "./AsideCard";

const ThymeAside: FC<{ user: User }> = ({ user }) => {
  const thymeData: ThymeData = initThymeData(user);
  const {
    monthsLeft,
    monthsLived,
    monthsToLive,
    yearsLeft,
    yearsLived,
    yearsToLive,
    weeksLeft,
    weeksLived,
    weeksToLive,
  } = thymeData;

  const getPercentageLived = (total: number, lived: number) => {
    return (lived / total) * 100;
  };

  const percentageLived = getPercentageLived(weeksToLive, weeksLived);

  return (
    <div className="flex flex-col gap-4">
      <AsideCard
        color="secondary"
        percentage={percentageLived}
        label="Estimated departure date:"
      />
      <AsideCard
        timeLeft={weeksLeft}
        timeLived={weeksLived}
        timeTotal={weeksToLive}
        interval="Weeks"
      />
      <AsideCard
        timeLeft={monthsLeft}
        timeLived={monthsLived}
        timeTotal={monthsToLive}
        interval="Months"
      />
      <AsideCard
        timeLeft={yearsLeft}
        timeLived={yearsLived}
        timeTotal={yearsToLive}
        interval="Years"
      />
      <AsideCard percentage={percentageLived} label="Percentage lived:" />
    </div>
  );
};

export default ThymeAside;
