import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SignInForm from "../components/signInForm.js"

const SecondPage = () => (
  <Layout>
    <SEO title="Kirjaudu sisään" />
    <h1>Kirjaudu sisään</h1>
    <SignInForm />
  </Layout>
)

export default SecondPage
