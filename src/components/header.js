import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      margin: `-8px -8px 1.45rem -8px`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        alignItems: "center",
      }}
      className="grid"
    >
      <h1 className="col">
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>

      <div className="col">
        <Link
          to="/signUp"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          Rekisteröidy
        </Link>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
