export type IntervalOption = {
  label: string;
  value: string;
};

export const intervalOptions = [
  {
    label: "Weeks",
    value: "weeks",
  },
  {
    label: "Months",
    value: "months",
  },
  {
    label: "Years",
    value: "years",
  },
];

export type CalanderOptions = {
  weeks: any[];
  months: any[];
  years: any[];
};

export type ThymeData = {
  daysLived: number;
  weeksLived: number;
  monthsLived: number;
  yearsLived: number;
  daysToLive: number;
  weeksToLive: number;
  monthsToLive: number;
  yearsToLive: number;
  weeksLeft: number;
  monthsLeft: number;
  yearsLeft: number;
  calanderItems: CalanderOptions;
};

export const initThymeData = (user: User): ThymeData => {
  const predictedYearsToLive = 90;
  const now = new Date();
  const birthDate = new Date(user?.birthDate ?? "");

  const predictedDeathDate = new Date(
    now.getFullYear() + predictedYearsToLive,
    now.getMonth(),
    now.getDate()
  );

  const daysToLive = Math.round(
    (predictedDeathDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );
  const weeksToLive = Math.round((daysToLive / 7 + Number.EPSILON) * 100) / 100;
  const monthsToLive =
    Math.round((daysToLive / 30 + Number.EPSILON) * 100) / 100;
  const yearsToLive =
    Math.round((daysToLive / 365 + Number.EPSILON) * 100) / 100;

  const daysLived =
    (now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24);
  const weeksLived = Math.round((daysLived / 7 + Number.EPSILON) * 100) / 100;
  const monthsLived = Math.round((daysLived / 30 + Number.EPSILON) * 100) / 100;
  const yearsLived = Math.round((daysLived / 365 + Number.EPSILON) * 100) / 100;

  const weeksLeft =
    Math.round((weeksToLive - weeksLived + Number.EPSILON) * 100) / 100;
  const monthsLeft =
    Math.round((monthsToLive - monthsLived + Number.EPSILON) * 100) / 100;
  const yearsLeft =
    Math.round((yearsToLive - yearsLived + Number.EPSILON) * 100) / 100;

  const calanderItems = {
    weeks: mergelivedAndToLiveTime(weeksLived, weeksToLive),
    months: mergelivedAndToLiveTime(monthsLived, monthsToLive),
    years: mergelivedAndToLiveTime(yearsLived, yearsToLive),
  };

  return {
    daysLived,
    weeksLived,
    monthsLived,
    yearsLived,
    daysToLive,
    weeksToLive,
    monthsToLive,
    yearsToLive,
    weeksLeft,
    monthsLeft,
    yearsLeft,
    calanderItems,
  };
};

const mergelivedAndToLiveTime = (amountLived: number, amountToLive: number) => {
  const arr: any = [];
  for (let i = 0; i < amountToLive; i++) {
    const isLived = i + 1 < amountLived;
    arr.push({ amountLived: i + 1, isLived });
  }
  return arr;
};
