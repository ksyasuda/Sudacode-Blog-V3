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
  return (
    <div key={id} className="index-post-container">
      <Link to={slug} className="index-post-link">
        <h1>{title}</h1>
        <p>
          {subject} | {date} | {timeToRead} min read
        </p>
        <p>{excerpt}</p>
      </Link>
    </div>
  )
}

export default IndexPost
