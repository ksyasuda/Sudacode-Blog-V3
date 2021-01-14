import React from "react"
import { Link } from "gatsby"

const footer: React.FC = () => {
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
      @ Kyle Yasuda {new Date().getFullYear()}, Built with{" "}
      <Link style={{ color: "dodgerblue" }} to="https://www.gatsbyjs.com">
        Gatsby
      </Link>
    </footer>
  )
}

export default footer
