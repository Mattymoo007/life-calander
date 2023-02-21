import { initThymeData, ThymeData } from "~/utils/thyme-data";
import { FC } from "react";

const ThymeAside: FC<{ user: User }> = ({ user }) => {
  const thymeData: ThymeData = initThymeData(user);
  const { weeksLeft, monthsLeft, yearsLeft, weeksLived, weeksToLive } =
    thymeData;

  const getPercentageLived = (total: number, lived: number) => {
    return (lived / total) * 100;
  };

  const percentageLived = getPercentageLived(weeksToLive, weeksLived);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white border border-primary/50 rounded-lg p-10 relative overflow-hidden">
        <p className="text-gray-700">Weeks left:</p>
        <span className="text-3xl font-bold">{Math.round(weeksLeft)}</span>
      </div>

      <div className="bg-white border border-primary/50 rounded-lg p-10 relative overflow-hidden">
        <p className="text-gray-700">Months left:</p>
        <span className="text-3xl font-bold">{Math.round(monthsLeft)}</span>
      </div>

      <div className="bg-white border border-primary/50 rounded-lg p-10 relative overflow-hidden">
        <p className="text-gray-700">Years left:</p>
        <span className="text-3xl font-bold">{Math.round(yearsLeft)}</span>
      </div>

      <div className="bg-white border border-primary/50 rounded-lg p-10 relative overflow-hidden">
        <div
          className="bg-primary/20 h-full w-full absolute left-0 top-0"
          style={{ width: `${percentageLived}%` }}
        />
        <p className="text-gray-700">Percentage lived:</p>
        <span className="text-3xl font-bold">
          {Math.round(percentageLived)}%
        </span>
      </div>
    </div>
  );
};

export default ThymeAside;
