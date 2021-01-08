import React from "react"
import { Link } from "gatsby"
import Button from "@material-ui/core/Button"
import HomeIcon from "@material-ui/icons/Home"
import CreateIcon from "@material-ui/icons/Create"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import FlightIcon from "@material-ui/icons/Flight"

interface SideLinkProps {
  to: string
  children: string
  icon: string
}

const SideLink: React.FC<SideLinkProps> = ({ to, children, icon }) => {
  const iconStyle = { fontWeight: "bold" }
  const map = new Map([
    ["home", <HomeIcon className="sidelink-icon" />],
    ["about", <AccountCircleIcon className="sidelink-icon" />],
    ["blog", <CreateIcon className="sidelink-icon" />],
    ["travel", <FlightIcon className="sidelink-icon" />],
  ])
  const selectedIcon = map.get(icon)
  return (
    <Link to={to} className="sidenav-link">
      <Button
        variant="text"
        className="sidenav-button"
        startIcon={selectedIcon}
      >
        {children}
      </Button>
    </Link>
  )
}

export default SideLink
