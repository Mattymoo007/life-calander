import { FC } from 'react'
import CountUp from 'react-countup'

const AsideCard: FC<{
  timeLeft?: number
  timeLived?: number
  timeTotal?: number
  interval?: string
  percentage?: number
  label?: string
  color?: 'primary' | 'secondary' | 'tertiary'
}> = ({
  timeLeft,
  timeLived,
  timeTotal,
  interval,
  percentage,
  label,
  color = 'primary',
}) => {
  const countUpProps = {
    useEasing: true,
  }

  const intervalAbbr = interval?.slice(0, 1).toLowerCase()
  const borderColor =
    color === 'primary'
      ? `border-primary/50`
      : color === 'secondary'
      ? `border-secondary/50`
      : `border-tertiary/50`

  const bgColor =
    color === 'primary'
      ? `bg-primary/20`
      : color === 'secondary'
      ? `bg-secondary/20`
      : `bg-tertiary/20`

  return (
    <div
      className={`bg-white border ${borderColor} rounded-lg relative overflow-hidden ${'grid grid-cols-2'}`}
    >
      <div className="p-8">
        {label ? (
          <p className="text-gray-700 ">{label}</p>
        ) : (
          <p className="text-gray-700 ">{interval} left:</p>
        )}

        <span className={`text-3xl font-bold cursor-default text-${color}/70`}>
          {percentage ? (
            <>
              <CountUp {...countUpProps} end={Math.round(percentage ?? 0)} />
              <span className={`text-${color}/50`}>%</span>
            </>
          ) : (
            <>
              <CountUp {...countUpProps} end={Math.round(timeLeft ?? 0)} />
              <span className={`text-${color}/50`}>{intervalAbbr}</span>
            </>
          )}
        </span>
      </div>

      {percentage ? (
        <div
          className={`${bgColor} h-full w-full absolute left-0 top-0`}
          style={{ width: `${percentage}%` }}
        />
      ) : (
        <div
          className={`border-l ${borderColor} border-dashed flex flex-col text-black/50`}
        >
          <div className={`border-b ${borderColor} border-dashed grow center`}>
            {interval} lived:{' '}
            <span className="ml-1 font-bold">
              <CountUp {...countUpProps} end={Math.round(timeLived ?? 0)} />
              <span className="text-black/30">{intervalAbbr}</span>
            </span>
          </div>
          <div className="grow center">
            {interval} total:{' '}
            <span className="ml-1 font-bold">
              <CountUp {...countUpProps} end={Math.round(timeTotal ?? 0)} />
              <span className="text-black/30">{intervalAbbr}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default AsideCard
