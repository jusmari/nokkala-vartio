import React from "react"
import dayjs from "dayjs"

const CalendarNavigator = ({
  currentMonth,
  currentYear,
  handleChange,
  handleReset,
}) => {
  const todayContent =
    currentMonth === dayjs().month() + 1 && currentYear === dayjs().year()
      ? ""
      : "Tämä kuu"

  return (
    <div style={styles.container} className="grid">
      <button style={styles.button} onClick={() => handleChange(-1)}>
        Edellinen
      </button>
      <button
        style={styles.button}
        onClick={() => handleReset()}
        disabled={todayContent === ""}
      >
        {todayContent}
      </button>
      <button style={styles.button} onClick={() => handleChange(1)}>
        Seuraava
      </button>
    </div>
  )
}

const styles = {
  container: {
    padding: "0.5em",
  },
  button: {
    maxWidth: "100px",
    minWidth: "80px",
  },
}

export default CalendarNavigator
