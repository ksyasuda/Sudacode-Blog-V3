/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"
import favicon from "../images/favicon.ico"

import Header from "./Header/header"
import "./layout.css"

const Layout: React.FC = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Helmet>
        <link rel="icon" href={favicon} />
        <style>{"body { background-color: #b8bbbc }"}</style>
      </Helmet>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div
        style={{
          maxWidth: 1700,
          padding: `1.45rem 1.0875rem`,
        }}
        className="main-container"
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: `10px`,
            position: "relative",
            textAlign: "left",
          }}
          id="footer"
        >
          © Kyle Yasuda {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
