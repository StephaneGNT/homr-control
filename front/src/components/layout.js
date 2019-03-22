import React from "react"
// import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from './header';
import NavBar from './nav-bar';
import "./layout.css"

const Layout = (props) => (
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
          <Header siteTitle={data.site.siteMetadata.title} />
          <div
            style={{
              margin: `0 auto`,
              maxWidth: 960,
              padding: `0px 1.0875rem 1.45rem`,
              paddingTop: 0,
            }}
            className="row"
          >
            <div className="col-2"><NavBar /></div>
            <div className="col-10">
              <main>{props.children}</main>
            </div>
          </div>
      </>
    )}
  />
)

Layout.propTypes = {
  // children: PropTypes.function.isRequired,
}

export default Layout
