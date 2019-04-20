import React, { useState } from "react"
import getFirebase from "../firebase"
// import firebase from "@firebase/app"

const signUpForm = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = e => {
    e.preventDefault()

    console.log("submitted")

    const lazyApp = import("@firebase/app")
    const lazyAuth = import("@firebase/auth")

    Promise.all([lazyApp, lazyAuth]).then(([fb]) => {
      let firebase = fb.default

      getFirebase(firebase)
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(resp => console.log({ resp }))
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code
          var errorMessage = error.message
          console.log({ errorMessage })
        })
    })
  }

  return (
    <form onSubmit={handleSubmit} className="grid-1">
      <label htmlFor="signUp-email-input" className="col">
        Sähköposti
        <input
          id="signUp-email-input"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>

      <label htmlFor="signUp-name-input" className="col">
        Nimi
        <input
          id="signUp-name-input"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>

      <label htmlFor="signUp-password-input" className="col">
        Salasana
        <input
          id="signUp-password-input"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>

      <button type="submit">Lähetä</button>
    </form>
  )
}

export default signUpForm
