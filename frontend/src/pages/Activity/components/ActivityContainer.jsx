import groupByDate from '../../../utils/activities/groupDates.js'
import ActivityCard from './ActivityCard.jsx'

const ActivityContainer = ({ activities }) => {

  const grouped = groupByDate(activities)

  return (
    <div className="flex flex-col gap-6 px-3 py-7">
      {Object.entries(grouped).map(([label, activity]) => (
        <div key={label} className='w-full flex flex-col'>
          <div className='w-full flex items-center justify-center'>
            <hr className='w-full mx-4 text-neutral-500/30' />
            <h2 className="text-nowrap text-xs font-bold text-neutral-500 uppercase tracking-wide">
              {label}
            </h2>
            <hr className='w-full mx-4 text-neutral-500/30' />
          </div>

          <div className="flex flex-col gap-3 mt-2">
            {activity.map(a => (
              <ActivityCard
                a={a}
                label={label} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ActivityContainer
