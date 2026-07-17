import groupByDate from '../../../utils/activities/groupDates.js'
import ActivityCard from './ActivityCard.jsx'

const ActivityContainer = ({ activities }) => {

  const grouped = groupByDate(activities)

  if (!activities.length) {
    return (
      <div className="flex flex-col items-center justify-center md:h-100 h-80 gap-3 text-gray-400">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10">
          <i className="ri-inbox-line text-2xl"></i>
        </div>
        <h2 className="font-open-sans text-sm sm:text-base">
          No activities to show yet...
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 max-w-75 text-center">
          Create or Complete goals, projects, or tasks to see them here.
        </p>
      </div>
    );
  }

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
                key={a._id}
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
