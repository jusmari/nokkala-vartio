import React, { createContext, useContext, useReducer } from "react"
import {
  SET_USER_INFO,
  CLOSE_MODAL,
  OPEN_DAY,
  SET_RESERVATIONS,
  ADD_RESERVATION,
} from "../actions"

const StateContext = createContext()

export const INITIAL_STATE = {
  uid: "",
  displayName: "",
  email: "",
  isModalOpen: false,
  selectedDate: null,
  reservations: [],
}

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
)

// gatsby breaks build time since context does no to seem work so well with it
export const useGlobalState = () => {
  const globalState = useContext(StateContext)
  return globalState ? globalState : [{}, null]
}

export const reducer = (state, action) => {
  if (process.env.NODE_ENV === "development") {
    logStateAndActionIfInDevelopment(state, action)
  }

  const { type, payload } = action

  switch (type) {
    case ADD_RESERVATION:
      const newReservation = payload

      return {
        ...state,
        reservations: [...state.reservations, newReservation],
      }
    case SET_RESERVATIONS:
      return {
        ...state,
        reservations: payload.data,
      }
    case OPEN_DAY:
      return {
        ...state,
        isModalOpen: true,
        selectedDate: payload.date,
      }
    case CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      }
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

const logStateAndActionIfInDevelopment = (state, action, end) => {
  console.log("ACTION: " + action.type, action, state)
  if (end) {
    console.log("end of action")
  }
}
