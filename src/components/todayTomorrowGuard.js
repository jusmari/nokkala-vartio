import React from "react"
import { useGlobalState } from "../services/state"
import dayjs from "dayjs"

const todayTomorrowGuard = () => {
  const [{ reservations }] = useGlobalState()

  const today = dayjs().format("DD-MM-YYYY")
  const tomorrow = dayjs()
    .add(1, "day")
    .format("DD-MM-YYYY")

  const todaysGuard = reservations.find(r => (r.date = today))
  const tomorrowssGuard = reservations.find(r => (r.date = tomorrow))

  return (
    <div className="grid-middle">
      <div className="col">{`Tänään vartiossa: ${(todaysGuard &&
        todaysGuard.name) ||
        "Ei vartijaa"}`}</div>
      <div className="col">{`Huomenna vartiossa: ${(tomorrowssGuard &&
        tomorrowssGuard.name) ||
        "Ei vartijaa"}`}</div>
    </div>
  )
}

export default todayTomorrowGuard
