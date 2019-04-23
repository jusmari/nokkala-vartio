import React, { useState } from "react"
import Layout from "../components/layout"
import Calendar from "../components/calendar"
import SEO from "../components/seo"
import CalendarNavigator from "../components/calendar-navigator"
import dayjs from "dayjs"
import { useGlobalState } from "../services/state"

const IndexPage = () => {
  const [month, setMonth] = useState(dayjs().month() + 1)
  const [year, setYear] = useState(dayjs().year())
  const [state, dispatch] = useGlobalState()

  const handleWindowChange = delta => {
    const currentNow = dayjs(new Date(year, month))
    const next = currentNow.add(delta, "month")
    setMonth(next.month())
    setYear(next.year())
  }

  const handleReset = () => {
    const next = dayjs()
    setMonth(next.month() + 1)
    setYear(next.year())
  }

  return (
    <Layout>
      <SEO title="Home" keywords={["nokkala", "vartio", "kalenteri"]} />

      <h1>Varauskalenteri</h1>

      <CalendarNavigator
        handleChange={handleWindowChange}
        currentMonth={month}
        currentYear={year}
        handleReset={handleReset}
      />
      <Calendar currentMonth={month} currentYear={year} />
    </Layout>
  )
}

export default IndexPage
