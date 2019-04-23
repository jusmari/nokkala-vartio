/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { useEffect } from "react"
import PropTypes from "prop-types"
import Modal from "react-modal"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import "./layout.css"
import DayReserveModal from "./dayReserveModal"
import firebase from "../services/firebase"
import { useGlobalState } from "../services/state"
import { SET_RESERVATIONS } from "../actions"

const Layout = ({ children }) => {
  const [, dispatch] = useGlobalState()

  useEffect(() => {
    Modal.setAppElement("#site")
  }, [])

  useEffect(() => {
    fetchReservations().then(qs => {
      const data = []
      qs.forEach(doc => {
        data.push({ ...doc.data() })
      })

      dispatch({ type: SET_RESERVATIONS, payload: { data } })
    })
  }, [])

  const fetchReservations = () => {
    const { store } = firebase
    return store()
      .collection("reservations")
      .get()
  }

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <div className="site" id="site">
            <Header siteTitle={data.site.siteMetadata.title} />

            <div style={styles.siteContent}>
              <main>{children}</main>
            </div>
            <Footer />
          </div>
          <DayReserveModal />
        </>
      )}
    />
  )
}

const styles = {
  siteContent: {
    margin: `0 auto`,
    maxWidth: 960,
    paddingTop: 0,
    flexGrow: "1",
    width: "100%",
  },
  footer: {
    backgroundColor: "rebeccapurple",
    padding: "0.75rem",
  },
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
