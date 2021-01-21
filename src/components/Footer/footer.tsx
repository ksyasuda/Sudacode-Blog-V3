import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import MediaLink from "./MediaLink/MediaLink"
import GitHubIcon from "@material-ui/icons/GitHub"
import RedditIcon from "@material-ui/icons/Reddit"
import MailIcon from "@material-ui/icons/Mail"
import AttachFileIcon from "@material-ui/icons/AttachFile"

import "./footer.css"

interface ResumeQuery {
  allFile: {
    edges: {
      node: {
        publicURL: string
      }
    }[]
  }
}

const Footer: React.FC = () => {
  const data: ResumeQuery = useStaticQuery(graphql`
    {
      allFile(filter: { name: { eq: "YasudaKyleResume2020" } }) {
        edges {
          node {
            publicURL
          }
        }
      }
    }
  `)
  const resumeUrl = data.allFile.edges[0].node.publicURL
  return (
    <footer
      style={{
        marginTop: "50px",
        position: "relative",
        textAlign: "center",
        color: "#bca56c",
      }}
      id="footer"
    >
      <section id="my-links">
        <MediaLink
          url="https://github.com/ksyasuda"
          text="GitHub"
          icon={<GitHubIcon />}
        />
        <MediaLink
          url="https://reddit.com/u/sudacode"
          text="Reddit"
          icon={<RedditIcon />}
        />
        <MediaLink
          url={`mailto:ksyasuda@umich.edu`}
          text="Email"
          icon={<MailIcon />}
        />
        <MediaLink url={resumeUrl} text="Resume" icon={<AttachFileIcon />} />
      </section>
      <section id="copyright">
        @ Kyle Yasuda {new Date().getFullYear()}, Built with{" "}
        <a
          style={{ color: "dodgerblue" }}
          href="https://www.gatsbyjs.com"
          rel="noreferrer"
          target="__blank"
        >
          Gatsby
        </a>
      </section>
    </footer>
  )
}

export default Footer
