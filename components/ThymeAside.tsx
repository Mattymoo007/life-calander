import { initThymeData } from '~/utils/thyme-data'
import { FC } from 'react'
import AsideCard from './AsideCard'
import { ThymeData } from '@prisma/client'

const ThymeAside: FC<{ thymeData: ThymeData }> = ({ thymeData }) => {
  const _thymeData = initThymeData(thymeData)

  const {
    predictedDeathDate,
    daysLeft,
    daysLived,
    daysToLive,
    monthsLeft,
    monthsLived,
    monthsToLive,
    yearsLeft,
    yearsLived,
    yearsToLive,
    weeksLeft,
    weeksLived,
    weeksToLive,
  } = _thymeData

  const getPercentageLived = (total: number, lived: number) => {
    return (lived / total) * 100
  }

  const percentageLived = getPercentageLived(daysToLive, daysLived)
  const formattedDate = predictedDeathDate.format('DD MMMM YYYY')

  return (
    <div className="flex flex-col gap-4">
      <AsideCard percentage={percentageLived} label="Percentage lived:" />
      <AsideCard
        timeLeft={yearsLeft}
        timeLived={yearsLived}
        timeTotal={yearsToLive}
        interval="Years"
      />
      <AsideCard
        timeLeft={monthsLeft}
        timeLived={monthsLived}
        timeTotal={monthsToLive}
        interval="Months"
      />
      <AsideCard
        timeLeft={weeksLeft}
        timeLived={weeksLived}
        timeTotal={weeksToLive}
        interval="Weeks"
      />

      <AsideCard
        color="secondary"
        label="Expected date of departure:"
        text={formattedDate}
      />
    </div>
  )
}

export default ThymeAside
