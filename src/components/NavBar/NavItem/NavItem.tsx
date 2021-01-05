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
    <Link to={to}>
      <Button
        variant="text"
        color="secondary"
        size="large"
        startIcon={startIcon}
        className={cname}
        style={{ fontSize: "x-large" }}
      >
        {text}
      </Button>
    </Link>
  )
}

export default NavItem
