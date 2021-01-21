import React from "react"
import { Link } from "gatsby"
import Button from "@material-ui/core/Button/Button"

interface MediaLinkProps {
  url: string
  text: string
  icon: JSX.Element
}

const medialink: React.FC<MediaLinkProps> = ({ url, text, icon }) => {
  return (
    <a
      style={{ margin: "10px" }}
      href={url}
      target="__blank"
      rel="noreferrer"
      className="my-link"
    >
      <Button variant="outlined" color="primary" startIcon={icon}>
        {text}
      </Button>
    </a>
  )
}

export default medialink
