import React from "react"
import { Link } from "gatsby"
import Button from "@material-ui/core/Button"

import "./NavItem.css"

interface NavItemProps {
  to: string
  startIcon: JSX.Element
  cname: string
  text: string
}

const NavItem: React.FC<NavItemProps> = props => {
  const { to, startIcon, cname, text } = props
  return (
    <Link
      style={{
        textDecoration: "none",
        color: "rgba(192, 97, 19, 0.945)",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: "x-large",
        position: "relative",
      }}
      to={to}
    >
      <Button startIcon={startIcon} className={cname}>
        {text}
      </Button>
    </Link>
  )
}

export default NavItem
