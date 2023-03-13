import { FC } from 'react'
import CountUp from 'react-countup'

const AsideCard: FC<{
  timeLeft?: number
  timeLived?: number
  timeTotal?: number
  interval?: string
  percentage?: number
  text?: string
  label?: string
  color?: 'primary' | 'secondary' | 'tertiary'
}> = ({
  timeLeft,
  timeLived,
  timeTotal,
  interval,
  percentage,
  text,
  label,
  color = 'primary',
}) => {
  const countUpProps = {
    useEasing: true,
  }

  const intervalAbbr = interval?.slice(0, 1).toLowerCase()

  return (
    <div
      className={`bg-white border border-${color}/50 rounded-lg relative overflow-hidden ${
        !text && !percentage && 'grid grid-cols-2'
      }`}
    >
      <div className="p-8">
        {label ? (
          <p className="text-gray-600 font-medium">{label}</p>
        ) : (
          <p className="text-gray-600 font-medium">{interval} left:</p>
        )}

        <div
          className={`text-3xl mt-1 font-semibold cursor-default text-${color}/70`}
        >
          {percentage ? (
            <>
              <CountUp {...countUpProps} end={Math.round(percentage ?? 0)} />
              <span>%</span>
            </>
          ) : text ? (
            <span>{text}</span>
          ) : (
            <>
              <CountUp {...countUpProps} end={Math.round(timeLeft ?? 0)} />
              <span>{intervalAbbr}</span>
            </>
          )}
        </div>
      </div>

      {percentage ? (
        <div
          className={`bg-${color}/20 h-full w-full absolute left-0 top-0`}
          style={{ width: `${percentage}%` }}
        />
      ) : !text ? (
        <div
          className={`border-l border-${color}/50 border-dashed flex flex-col text-black/50`}
        >
          <div
            className={`border-b border-${color}/50 border-dashed grow center`}
          >
            {interval} lived:{' '}
            <span className="ml-1 font-semibold">
              <CountUp {...countUpProps} end={Math.round(timeLived ?? 0)} />
              <span className="text-black/30">{intervalAbbr}</span>
            </span>
          </div>
          <div className="grow center">
            {interval} total:{' '}
            <span className="ml-1 font-semibold">
              <CountUp {...countUpProps} end={Math.round(timeTotal ?? 0)} />
              <span className="text-black/30">{intervalAbbr}</span>
            </span>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default AsideCard
