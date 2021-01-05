import React from "react"
import { Link } from "gatsby"
import Button from "@material-ui/core/Button"
import NavItem from "./NavItem/NavItem"
import HomeIcon from "@material-ui/icons/Home"
import CreateIcon from "@material-ui/icons/Create"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import FlightIcon from "@material-ui/icons/Flight"

import "./NavBar.css"

const NavBar: React.FC = () => {
  //   let stuff = [classes.Link, classes.ListItem]

  let style = {
    textDecoration: "none",
    color: "rgba(192, 97, 19, 0.945)",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: "x-large",
    postition: "relative",
  }

  const homeIcon = <HomeIcon style={{ color: "dodgerblue" }} />

  return (
    <div className="Div">
      <ul className="List">
        <li className="ListItem">
          {/*

          <Link className="Link" to="/">
            <Button startIcon={} className="Button">
              HOME
            </Button>
          </Link>
				*/}
          <NavItem to="/" cname="button" startIcon={homeIcon} text="HOME" />
        </li>
        <li className="Divider">|</li>
        <li className="ListItem">
          <Link className="Link" to="/about/">
            <Button
              startIcon={<AccountCircleIcon style={{ color: "dodgerblue" }} />}
              className="Button"
              color="secondary"
            >
              ABOUT
            </Button>
          </Link>
        </li>
        <li className="Divider">|</li>
        <li className="ListItem">
          <Link className="Link" to="/blog/">
            <Button
              startIcon={<CreateIcon style={{ color: "dodgerblue" }} />}
              className="Button"
              color="secondary"
            >
              BLOG
            </Button>
          </Link>
        </li>
        <li className="Divider">|</li>
        <li className="ListItem">
          <Link
            className="Link"
            // to="https://sudacode-travelapp.herokuapp.com"
            to="/travel/"
          >
            <Button
              startIcon={<FlightIcon style={{ color: "dodgerblue" }} />}
              className="Button"
              color="secondary"
            >
              TRAVEL
            </Button>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default NavBar
