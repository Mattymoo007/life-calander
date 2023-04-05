import { ThymeData } from '@prisma/client'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export const intervalOptions = [
  {
    label: 'Weeks',
    value: 'weeks',
  },
  {
    label: 'Months',
    value: 'months',
  },
  {
    label: 'Years',
    value: 'years',
  },
]

dayjs.extend(relativeTime)

export const initThymeData = (thymeData: ThymeData) => {
  const now = dayjs().toDate()
  const birthDate = dayjs(thymeData.birthDate).toDate()

  const predictedDeathDate = dayjs(birthDate).add(
    thymeData.totalTime ?? 90,
    'years'
  )

  const daysToLive = predictedDeathDate.diff(birthDate, 'days')
  const weeksToLive = predictedDeathDate.diff(birthDate, 'weeks')
  const monthsToLive = predictedDeathDate.diff(birthDate, 'months')
  const yearsToLive = predictedDeathDate.diff(birthDate, 'years')

  const daysLived = dayjs(now).diff(birthDate, 'days')
  const weeksLived = dayjs(now).diff(birthDate, 'weeks')
  const monthsLived = dayjs(now).diff(birthDate, 'months')
  const yearsLived = dayjs(now).diff(birthDate, 'years')

  const daysLeft = daysToLive - daysLived
  const weeksLeft = weeksToLive - weeksLived
  const monthsLeft = monthsToLive - monthsLived
  const yearsLeft = yearsToLive - yearsLived

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
    daysLeft,
    weeksLeft,
    monthsLeft,
    yearsLeft,
    getCalanderItems: (interval: string) => {
      if (interval === 'weeks')
        return mergelivedAndToLiveTime(weeksLived, weeksToLive)
      if (interval === 'months')
        return mergelivedAndToLiveTime(monthsLived, monthsToLive)
      if (interval === 'years')
        return mergelivedAndToLiveTime(yearsLived, yearsToLive)
      return []
    },
  }
}

export const mergelivedAndToLiveTime = (
  amountLived: number,
  amountToLive: number
) => {
  const arr: CalanderOption[] = []
  const lived = Math.round(amountLived)
  const toLive = Math.round(amountToLive)

  for (let i = 0; i < toLive; i++) {
    const isLived = i + 1 < lived
    const isCurrent = i + 1 === lived

    arr.push({ value: i + 1, isLived, ...(isCurrent && { isCurrent }) })
  }

  return arr
}
