import { useEffect } from "react"
import firebase from "./firebase"
import { useGlobalState } from "./state"
import { SET_USER_INFO } from "../actions"
import { navigate } from "gatsby"

export const AuthListener = () => {
  const { auth } = firebase
  const globalState = useGlobalState()
  const dispatch = globalState && globalState[1]

  useEffect(() => {
    // onAuthStateChanged returns an unsubscribe method
    const stopAuthListener = auth().onAuthStateChanged(user => {
      if (user) {
        dispatch({
          type: SET_USER_INFO,
          payload: {
            displayName: user.displayName,
            uid: user.uid,
            email: user.email,
          },
        })
      } else {
        dispatch({
          type: SET_USER_INFO,
          payload: {
            displayName: null,
            uid: null,
          },
        })
      }
    })

    return () => {
      stopAuthListener()
    }
  }, [])

  return null
}

export const signUp = (email, password, name, dispatch) => {
  const { auth } = firebase

  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      auth().currentUser.updateProfile({ displayName: name })

      dispatch({
        type: SET_USER_INFO,
        payload: {
          displayName: name,
        },
      })
    })
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message

      return errorMessage
    })
}

export const signOut = () => {
  const { auth } = firebase
  auth().signOut()
  navigate("")
}

export const signIn = (email, password) => {
  const { auth } = firebase

  return auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {})
    .catch(error => {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message

      return errorMessage
    })
}
