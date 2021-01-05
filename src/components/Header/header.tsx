import { Link } from "gatsby"
import React, { useState } from "react"
import NavBar from "../NavBar/NavBar"
import "./header.css"

interface HeaderProps {
  siteTitle: string
}

const Header: React.FC<HeaderProps> = ({ siteTitle }) => {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleMenuToggle = (event: Event) => {
    event.preventDefault()
    setShow(prev => !prev)
  }

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
          padding: "21.5px",
        }}
      >
        <h1>
          <Link to="/" className="site-title">
            {siteTitle}
          </Link>
        </h1>
      </div>
      <div style={{ float: "left", position: "relative", top: "12px" }}>
        <NavBar />
        {/* <SideDrawer show={show} clicked={handleMenuToggle} /> */}
      </div>
    </header>
  )
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
