import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { useGlobalState } from "../services/state"
import { signOut } from "../services/auth"

const Header = ({ siteTitle }) => {
  const [{ uid }] = useGlobalState()

  return (
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
        }}
        className="grid-middle"
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

        {!uid && (
          <div className="col">
            <div className="grid" style={{ justifyContent: "flex-end" }}>
              <div>
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

              <div style={{ marginLeft: 15 }}>
                <Link
                  to="/signIn"
                  style={{
                    color: `white`,
                    textDecoration: `none`,
                  }}
                >
                  Kirjaudu sisään
                </Link>
              </div>
            </div>
          </div>
        )}

        {uid && (
          <div className="col" onClick={() => signOut()}>
            <div
              style={{
                color: `white`,
                textDecoration: `none`,
                cursor: "pointer",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              Kirjaudu ulos
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
