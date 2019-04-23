import React, { useState } from "react"
import { signUp } from "../services/auth"
import { useGlobalState } from "../services/state"
import { navigate } from "gatsby"
import LoadingIndicator from "./loadingIndicator"

const signUpForm = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [, dispatch] = useGlobalState()

  const handleSubmit = e => {
    e.preventDefault()
    setError("")

    if (password !== passwordConfirm) {
      setError("Salasanat eivät ole samat")
      setPassword("")
      setPasswordConfirm("")
      return
    }

    setLoading(true)
    signUp(email, password, name, dispatch).then(e => {
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
          Rekisteröityminen epäonnistui! Syy: {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid-1">
        <label htmlFor="signUp-email-input" className="col">
          Sähköposti
          <input
            id="signUp-email-input"
            type="email"
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="signUp-name-input" className="col">
          Nimi
          <input
            id="signUp-name-input"
            type="name"
            value={name}
            required
            onChange={e => setName(e.target.value)}
          />
        </label>

        <label htmlFor="signUp-password-input" className="col">
          Salasana
          <input
            id="signUp-password-input"
            type="password"
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />
        </label>

        <label htmlFor="signUp-passwordConfirm-input" className="col">
          Salasana
          <input
            id="signUp-passwordConfirm-input"
            type="password"
            value={passwordConfirm}
            required
            onChange={e => setPasswordConfirm(e.target.value)}
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
