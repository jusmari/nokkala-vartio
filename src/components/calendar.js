import React from "react"
import dayjs from "dayjs"
import DayBox from "./dayBox"
import { range, zipObj, times } from "ramda"

const Calendar = ({ currentMonth, currentYear }) => {
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate()
  const days = zipObj(range(0, 7), "ma,ti,ke,to,pe,la,su".split(","))
  const today = dayjs()

  const firstDayWeekday = dayjs(
    new Date(currentYear, currentMonth - 1, 1)
  ).day()
  const prefixDayBoxes = times(i => <DayBox.Empty key={i} />, firstDayWeekday)

  const dayBoxes = range(1, daysInMonth + 1).map(d => (
    <DayBox
      key={d}
      dayNumber={d}
      month={currentMonth}
      year={currentYear}
      days={days}
      today={today}
    />
  ))

  return (
    <div className="grid-8_xs-1" style={{ marginBottom: `1.45rem` }}>
      {prefixDayBoxes}
      {dayBoxes}
    </div>
  )
}

export default Calendar
