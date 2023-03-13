import { initThymeData } from '~/utils/thyme-data'
import { FC } from 'react'
import AsideCard from './AsideCard'
import { ThymeData } from '@prisma/client'

const ThymeAside: FC<{ thymeData: ThymeData }> = ({ thymeData }) => {
  const _thymeData = initThymeData(thymeData)

  const {
    predictedDeathDate,
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

  const percentageLived = getPercentageLived(weeksToLive, weeksLived)
  const formattedDate = predictedDeathDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="flex flex-col gap-4">
      <AsideCard percentage={percentageLived} label="Percentage lived:" />
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
      <AsideCard
        color="secondary"
        label="Expected date of departure:"
        text={formattedDate}
      />
    </div>
  )
}

export default ThymeAside
