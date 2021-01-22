import React from "react"
import { Link } from "gatsby"
import Button from "@material-ui/core/Button/Button"

interface MediaLinkProps {
  url: string
  text: string
  icon: JSX.Element
  download?: boolean
}

const medialink: React.FC<MediaLinkProps> = ({ url, text, icon, download }) => {
  let link = (
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
  if(download !== undefined) {
    link = (
      <a
        style={{ margin: "10px" }}
        href={url}
        target="__blank"
        rel="noreferrer"
        className="my-link"
        download
      >
        <Button variant="outlined" color="primary" startIcon={icon}>
          {text}
        </Button>
      </a>
    ) 
  }
  return link
}

export default medialink
