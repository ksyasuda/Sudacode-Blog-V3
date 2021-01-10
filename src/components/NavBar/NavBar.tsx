import React from "react"
import NavItem from "./NavItem/NavItem"
import HomeIcon from "@material-ui/icons/Home"
import CreateIcon from "@material-ui/icons/Create"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import FlightIcon from "@material-ui/icons/Flight"

import "./NavBar.css"

const NavBar: React.FC = () => {
  const homeIcon = <HomeIcon style={{ color: "dodgerblue" }} />
  const aboutIcon = <AccountCircleIcon style={{ color: "dodgerblue" }} />
  const createIcon = <CreateIcon style={{ color: "dodgerblue" }} />
  const flightIcon = <FlightIcon style={{ color: "dodgerblue" }} />

  return (
    <div className="navbar-div">
      <ul className="navbar-list">
        <li className="ListItem">
          <NavItem
            show
            to="/"
            cname="button"
            startIcon={homeIcon}
            text="HOME"
          />
        </li>
        <li className="navbar-divider">|</li>
        <li className="ListItem">
          <NavItem
            show
            to="/about/"
            cname="button"
            startIcon={aboutIcon}
            text="ABOUT"
          />
        </li>
        <li className="navbar-divider">|</li>
        <li className="ListItem">
          <NavItem
            show
            to="/blog/"
            cname="button"
            startIcon={createIcon}
            text="BLOG"
          />
        </li>
        <li className="navbar-divider">|</li>
        <li className="ListItem">
          <NavItem
            show
            to="/travel/"
            cname="button"
            startIcon={flightIcon}
            text="TRAVEL"
          />
        </li>
      </ul>
    </div>
  )
}

export default NavBar
