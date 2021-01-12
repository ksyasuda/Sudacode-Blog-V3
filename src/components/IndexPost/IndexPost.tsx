import React from "react"
import { Link, graphql } from "gatsby"
import "./IndexPost.css"

interface IndexPostProps {
  id: string
  title: string
  date: string
  subject: string
  excerpt: string
  timeToRead: number
  slug: string
}

const IndexPost: React.FC<IndexPostProps> = props => {
  const { id, title, date, subject, excerpt, timeToRead, slug } = props
  const parts = slug.split("/")
  const newSlug = "/blog/" + parts[2].substring(parts[2].indexOf(".") + 1)
  return (
    <article key={id} className="index-post-container">
      <Link to={newSlug} className="index-post-link">
        <h1 className="indexpost-title">{title}</h1>
        <p>
          {subject} | {date} | {timeToRead} min read
        </p>
        <p>{excerpt}</p>
      </Link>
    </article>
  )
}

export default IndexPost
