import React from "react"
import dayjs from "dayjs"
import DayBox from "./DayBox"
import { range, zipObj } from "ramda"

const Calendar = ({ currentMonth, currentYear }) => {
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate()
  const days = zipObj(range(0, 7), "ma,ti,ke,to,pe,la,su".split(","))
  const today = dayjs()

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
      {dayBoxes}
    </div>
  )
}

export default Calendar
