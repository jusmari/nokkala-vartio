import React from "react"
import dayjs from "dayjs"
import DayBox from "./dayBox"
import { range, zipObj, times } from "ramda"
import { useGlobalState } from "../services/state"

const Calendar = ({ currentMonth, currentYear }) => {
  const [{ reservations }, dispatch] = useGlobalState()
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate() + 1
  const days = zipObj(range(0, 7), "su,ma,ti,ke,to,pe,la".split(","))
  const today = dayjs()

  const firstDayWeekday = dayjs(
    new Date(currentYear, currentMonth - 1, 1)
  ).day()

  const prefixDayBoxes = times(
    i => <DayBox.Empty key={i} />,
    firstDayWeekday - 1
  )

  const dayBoxes = range(1, daysInMonth).map(d => {
    return (
      <DayBox
        key={d}
        dayNumber={d}
        month={currentMonth}
        year={currentYear}
        days={days}
        today={today}
        reservations={reservations}
        dispatch={dispatch}
      />
    )
  })

  return (
    <div className="grid-8_xs-1" style={{ marginBottom: `5rem` }}>
      {prefixDayBoxes}
      {dayBoxes}
    </div>
  )
}

export default Calendar
