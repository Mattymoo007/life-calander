import { ThymeData } from '@prisma/client'
import { FC } from 'react'
import { initThymeData } from '~/utils/thyme-data'

const Calander: FC<{
  selectedInterval: IntervalOption
  thymeData: ThymeData
}> = ({ selectedInterval, thymeData }) => {
  const { getCalanderItems } = initThymeData(thymeData)

  const calanderWrapperClasses: AnyObject = {
    weeks: 'gap-[4px]',
    months: 'gap-[6px]',
    years: 'gap-[6px]',
  }

  const widthClasses: AnyObject = {
    weeks: 'w-[90%]',
    months: 'w-[80%]',
    years: 'w-[30%]',
  }

  const itemClasses: AnyObject = {
    weeks: 'w-[10px] h-[10px]',
    months: 'w-[15px] h-[15px]',
    years: 'w-[20px] h-[20px]',
  }

  const currentInterval = selectedInterval.value

  return (
    <div className={`mx-auto ${widthClasses[currentInterval]}`}>
      <div
        className={`flex flex-wrap ${calanderWrapperClasses[currentInterval]}`}
      >
        {getCalanderItems(selectedInterval.value).map(
          (item: CalanderOption, index: number) => {
            return (
              <div
                key={index}
                className={`rounded-full ${
                  item.isLived
                    ? 'bg-primary/70'
                    : item.isCurrent
                    ? 'bg-primary/70 animate-pulse duration-200'
                    : 'border border-primary/70'
                } ${itemClasses[currentInterval]}`}
              />
            )
          }
        )}
      </div>

      <div className="flex items-center gap-4 mt-6">
        <span className="text-gray-500">Time:</span>
        <div className="flex gap-[6px] items-center">
          <div
            className={`rounded-full bg-primary/70 ${itemClasses[currentInterval]}`}
          />
          Gone
        </div>
        <div className="flex gap-[6px] items-center">
          <div
            className={`rounded-full border border-primary/70 ${itemClasses[currentInterval]}`}
          />
          Left
        </div>
        <div className="flex gap-[6px] items-center">
          <div
            className={`rounded-full bg-primary/70 animate-pulse ${itemClasses[currentInterval]}`}
          />
          Current
        </div>
      </div>
    </div>
  )
}

export default Calander
