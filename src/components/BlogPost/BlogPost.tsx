import { Link } from "gatsby"
import React from "react"

import "./BlogPost.css"

interface BlogPostProps {
  node: {
    id: string
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
      date: string
      subject: string
    }
    timeToRead: string
    excerpt: string
  }
  color: string
}

const BlogPost: React.FC<BlogPostProps> = ({ node, color }) => {
  return (
    <Link
      to={node.fields.slug}
      style={{ backgroundColor: color }}
      className="link"
      key={node.id}
    >
      <div
        key={node.id}
        style={{
          backgroundColor: color,
        }}
        className="postContainer"
      >
        <h3
          className="Title"
          style={{ marginBottom: "2px", fontStyle: "italic" }}
        >
          {node.frontmatter.title}
          {<br />}
          <span
            style={{
              color: "black",
              fontSize: "small",
              textDecoration: "none",
            }}
          >
            {node.frontmatter.date} |{" "}
            <span className="Subject">{node.frontmatter.subject}</span> |{" "}
          </span>
          <span
            style={{
              fontSize: "small",
              fontWeight: "bold",
            }}
          >
            {node.timeToRead} min <span className="ReadStr">read</span>
          </span>
          <hr className="Line" />
        </h3>
        <p className="Body">{node.excerpt}</p>
      </div>
    </Link>
  )
}

export default BlogPost
