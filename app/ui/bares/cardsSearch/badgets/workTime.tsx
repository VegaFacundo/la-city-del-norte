import { CalendarIcon } from '@heroicons/react/24/outline'

const WorkTime = ({ workTime }: { workTime: string }) => {
  return (
    <div className="flex items-center">
      <div className="w-6">
        <CalendarIcon className="w-6 h-6" />
      </div>
      <p className="block  text-base antialiased font-semibold leading-relaxed">
        {workTime}
      </p>
    </div>
  )
}

export default WorkTime
