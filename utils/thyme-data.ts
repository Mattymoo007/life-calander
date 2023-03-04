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

  return {
    predictedDeathDate,
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
    getCalanderItems: (interval: string) => {
      if (interval === "weeks")
        return mergelivedAndToLiveTime(weeksLived, weeksToLive);
      if (interval === "months")
        return mergelivedAndToLiveTime(monthsLived, monthsToLive);
      if (interval === "years")
        return mergelivedAndToLiveTime(yearsLived, yearsToLive);
      return [];
    },
  };
};

export const mergelivedAndToLiveTime = (
  amountLived: number,
  amountToLive: number
) => {
  const arr: CalanderOption[] = [];
  for (let i = 0; i < amountToLive; i++) {
    const isLived = i + 1 < amountLived;
    arr.push({ value: i + 1, isLived });
  }
  return arr;
};
