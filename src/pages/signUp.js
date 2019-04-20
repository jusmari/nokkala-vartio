import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SignUpForm from "../components/signUpForm"

const SecondPage = () => (
  <Layout>
    <SEO title="Rekisteröidy" />
    <h1>Rekisteröidy</h1>
    <SignUpForm />
  </Layout>
)

export default SecondPage
