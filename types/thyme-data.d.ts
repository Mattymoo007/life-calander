type IntervalOption = {
  label: string
  value: string
}

type CalanderOption = {
  value: number
  isLived: boolean
  isCurrent?: boolean
}

type ThymeData = {
  predictedDeathDate: Date
  daysLived: number
  weeksLived: number
  monthsLived: number
  yearsLived: number
  daysToLive: number
  weeksToLive: number
  monthsToLive: number
  yearsToLive: number
  weeksLeft: number
  monthsLeft: number
  yearsLeft: number
  getCalanderItems: Function
}
