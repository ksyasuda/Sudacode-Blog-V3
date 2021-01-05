import React from "react"
import { Link } from "gatsby"
import Button from "@material-ui/core/Button"
import HomeIcon from "@material-ui/icons/Home"
import CreateIcon from "@material-ui/icons/Create"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import FlightIcon from "@material-ui/icons/Flight"

import "./SideNav.css"

const sideNav = props => {
  return props.show ? (
    <div>
      <Link to="/" className="Sudacode">
        Sudacode
      </Link>
      <div className="Div" style={{ position: "relative", left: "-6.5%" }}>
        <ul className="List">
          <li className="Title">Navigation Menu</li>
          <li className="Divider">────────</li>
          <li className="ListItem">
            <Link className="Link" to="/">
              <Button
                startIcon={<HomeIcon style={{ color: "dodgerblue" }} />}
                className="Button"
                style={{
                  position: "relative",
                  left: "-8px",
                  color: "rgba(192, 97, 19, 0.945)",
                  fontWeight: "bold",
                  fontSize: "x-large",
                }}
              >
                HOME
              </Button>
            </Link>
          </li>
          <li className="Divider">────────</li>
          <li className="ListItem">
            <Link className="Link" to="/about/">
              <Button
                startIcon={
                  <AccountCircleIcon style={{ color: "dodgerblue" }} />
                }
                className="Button"
                style={{
                  position: "relative",
                  left: "-3px",
                  color: "rgba(192, 97, 19, 0.945)",
                  fontWeight: "bold",
                  fontSize: "x-large",
                }}
              >
                ABOUT
              </Button>
            </Link>
          </li>
          <li className="Divider">────────</li>
          <li className="ListItem">
            <Link className="Link" to="/blog/">
              <Button
                startIcon={<CreateIcon style={{ color: "dodgerblue" }} />}
                className="Button"
                style={{
                  position: "relative",
                  left: "-11px",
                  color: "rgba(192, 97, 19, 0.945)",
                  fontWeight: "bold",
                  fontSize: "x-large",
                }}
              >
                BLOG
              </Button>
            </Link>
          </li>
          <li className="Divider">────────</li>
          <li className="ListItem">
            <Link
              className="Link"
              // to="https://sudacode-travelapp.herokuapp.com"
              to="/travel/"
            >
              <Button
                startIcon={<FlightIcon style={{ color: "dodgerblue" }} />}
                className="Button"
                style={{
                  position: "relative",
                  left: "4px",
                  color: "rgba(192, 97, 19, 0.945)",
                  fontWeight: "bold",
                  fontSize: "x-large",
                }}
              >
                TRAVEL
              </Button>
            </Link>
          </li>
          <li className="Divider">────────</li>
        </ul>
      </div>
    </div>
  ) : null
}

export default sideNav
