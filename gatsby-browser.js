/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from "react"
import { StateProvider, reducer, INITIAL_STATE } from "./src/services/state"
import { AuthListener } from "./src/services/auth"

export const wrapRootElement = ({ element }) => {
  return (
    <StateProvider initialState={INITIAL_STATE} reducer={reducer}>
      <AuthListener />
      {element}
    </StateProvider>
  )
}
