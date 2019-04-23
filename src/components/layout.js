/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import Footer from "./footer"
import "./layout.css"

const Layout = ({ children }) => (
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
      <div className="site">
        <Header siteTitle={data.site.siteMetadata.title} />

        <div style={styles.siteContent}>
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    )}
  />
)

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
