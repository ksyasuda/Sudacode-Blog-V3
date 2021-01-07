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

interface LayoutProps {
  children: React.ReactNode
  showBackground: boolean
}

const Layout: React.FC<LayoutProps> = ({ children, showBackground }) => {
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
        {showBackground ? (
          <style>{"body { background-color: #b8bbbc }"}</style>
        ) : null}
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
            marginTop: `50px`,
            position: "relative",
            textAlign: "left",
            color: "#bca56c",
          }}
          id="footer"
        >
          © Kyle Yasuda {new Date().getFullYear()}, Built with
          {` `}
          <a style={{ color: "#bca56c" }} href="https://www.gatsbyjs.com">
            Gatsby
          </a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
