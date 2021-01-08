import React, { useState } from "react"
import { Link } from "gatsby"
import Drawer from "@material-ui/core/Drawer"
import Button from "@material-ui/core/Button"
import SideLink from "./SideLink/SideLink"

import "./SideNav.css"

interface Page {
  to: string
  icon: string
  text: string
}

const SideNav: React.FC = props => {
  const [show, setShow] = useState(false)

  const pages: Page[] = [
    { to: "/", icon: "home", text: "HOME" },
    { to: "/about/", icon: "about", text: "ABOUT" },
    { to: "/blog/", icon: "blog", text: "BLOG" },
    { to: "/travel/", icon: "travel", text: "TRAVEL" },
  ]

  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault()
    setShow(true)
  }

  return (
    <div id="sidenav-container">
      <Button
        color="primary"
        variant="contained"
        onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          handleClick(event)
        }
        className="sidenav-drawer-toggle"
      >
        MENU
      </Button>
      <Drawer
        anchor="left"
        open={show}
        onClose={function () {
          setShow(false)
        }}
        className="sidenav-drawer"
      >
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            fontWeight: "bold",
            fontFamily: "Open Sans",
          }}
          className="sidenav-button"
        >
          <Link to="/" className="sidenav-link" id="sidenav-site-title">
            SUDACODE
          </Link>
        </div>
        {/* <Button variant="text" className="sidenav-button">
          <Link to="/" className="sidenav-link">
            HOME
          </Link>
        </Button> */}
        {pages.map((page, idx) => {
          return (
            <SideLink key={idx} to={page.to} icon={page.icon}>
              {page.text}
            </SideLink>
          )
        })}
      </Drawer>
    </div>
  )
}

export default SideNav
