import React, { useState } from "react"
import Layout from "../components/layout"
import Calendar from "../components/calendar"
import SEO from "../components/seo"
import CalendarNavigator from "../components/calendar-navigator"
import dayjs from "dayjs"

const IndexPage = () => {
  const [month, setMonth] = useState(dayjs().month() + 1)
  const [year, setYear] = useState(dayjs().year())

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

/* <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
<h1>Hi people</h1>
<p>Welcome to your new Gatsby site.</p>
<p>Now go build something great.</p>
<div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
  <Image />
</div>
<Link to="/page-2/">Go to page 2</Link> */
