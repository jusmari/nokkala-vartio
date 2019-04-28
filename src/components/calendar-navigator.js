import React from "react"

const CalendarNavigator = ({ handleChange, handleReset }) => {
  return (
    <div style={styles.container} className="grid">
      <button style={styles.button} onClick={() => handleChange(-1)}>
        Edellinen
      </button>
      <button style={styles.button} onClick={() => handleReset()}>
        Tänään
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
    justifyContent: "center",
  },
  button: {
    maxWidth: "100px",
    minWidth: "80px",
    backgroundColor: "#66ACD7",
  },
}

export default CalendarNavigator
