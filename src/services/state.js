import React, { createContext, useContext, useReducer } from "react"
import { SET_USER_INFO } from "../actions"

const StateContext = createContext()

export const INITIAL_STATE = {
  uid: "",
  displayName: "",
  // // some other properties from the user object that may be useful
  // email: '',
  // photoURL: '',
}

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
)

export const useGlobalState = () => useContext(StateContext)

export const reducer = (state, action) => {
  if (process.env.NODE_ENV === "development") {
    logStateAndActionIfInDevelopment(state, action)
  }

  const { type, payload } = action

  switch (type) {
    case SET_USER_INFO:
      return {
        ...state,
        uid: payload.uid,
        displayName: payload.displayName,
      }
    default:
      return state
  }
}

const logStateAndActionIfInDevelopment = (state, action) => {
  console.log("ACTION: " + action.type, action, state)
}
