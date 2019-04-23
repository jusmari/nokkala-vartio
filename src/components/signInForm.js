import React, { useState } from "react"
import { signIn } from "../services/auth"
import { navigate } from "gatsby"
import LoadingIndicator from "./loadingIndicator"

const signUpForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setError("")

    setLoading(true)
    signIn(email, password).then(e => {
      setLoading(false)

      if (e) {
        setError(e)
        return
      }

      navigate("")
    })
  }

  return (
    <>
      {error && (
        <div style={{ paddingBottom: "1em", color: "brown" }}>
          Kirjautuminen epäonnistui! Syy: {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid-1">
        <label htmlFor="signIn-email-input" className="col">
          Sähköposti
          <input
            id="signIn-email-input"
            type="email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="signIn-password-input" className="col">
          Salasana
          <input
            id="signIn-password-input"
            type="password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />
        </label>

        <div className="col">
          {!loading && <button type="submit">Lähetä</button>}
          {loading && <LoadingIndicator loading={loading} />}
        </div>
      </form>
    </>
  )
}

export default signUpForm
