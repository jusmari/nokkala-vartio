import React from "react"
import dayjs from "dayjs"
import { OPEN_DAY } from "../actions"

const DayBox = ({
  dayNumber,
  month,
  year,
  days,
  today,
  reservations,
  dispatch,
}) => {
  const relativeToday = dayjs(new Date(year, month - 1, dayNumber))
  const weekday = relativeToday.day()

  const holidayClass = weekday === 6 || weekday === 0 ? "holiday" : "weekday"
  const todayClass = relativeToday.isSame(today, "day") ? "today" : ""

  const formattedRelativeToday = dayjs(
    new Date(year, month - 1, dayNumber)
  ).format("DD-MM-YYYY")

  const todaysReservations = reservations.find(r => {
    return r.date === formattedRelativeToday
  })

  const nameContent = () => <div>💂‍♀️{todaysReservations.name}</div>

  return (
    <div
      style={styles.dayBox}
      className={`col day-box ${holidayClass} ${todayClass}`}
      onClick={() =>
        dispatch({ type: OPEN_DAY, payload: { date: relativeToday } })
      }
    >
      <div className="grid">{relativeToday.format("DD-MM-YYYY")}</div>
      <div className="grid">{days[weekday]}</div>

      <div style={styles.nameRow} className="grid">
        {todaysReservations && nameContent()}
      </div>
    </div>
  )
}

DayBox.Empty = () => <div style={styles.empty} className={`col`} />

const styles = {
  dayBox: {
    padding: "0.5em",
    paddingLeft: "1em",
    border: "1px solid",
    boxShadow: "0 8px 6px -6px black",
    margin: "0.2em",
    width: "100px",
    height: "100px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  empty: {
    padding: "0.5em",
    paddingLeft: "1em",
    margin: "0.2em",
    width: "100px",
    height: "100px",
  },
  nameRow: {},
}

export default DayBox
