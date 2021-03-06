import { Link } from "gatsby"
import React, { useState } from "react"
import NavBar from "../NavBar/NavBar"
import SideNav from "../SideNav/SideNav"
import "./header.css"

interface HeaderProps {
  siteTitle: string
}

const Header: React.FC<HeaderProps> = ({ siteTitle }) => {
  return (
    <header
      style={{
        background: `rebeccapurple`,
        height: "95.834px",
      }}
    >
      <div
        style={{
          display: "flex",
          float: "left",
          padding: "21.5px",
        }}
      >
        <h1>
          <Link to="/" className="site-title">
            {siteTitle}
          </Link>
        </h1>
      </div>
      <div
        style={{
          float: "left",
          position: "relative",
          top: "44%",
        }}
      >
        <NavBar />
      </div>
      <SideNav />
    </header>
  )
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
