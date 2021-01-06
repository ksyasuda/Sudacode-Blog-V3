import React from "react"
import Layout from "../../components/layout"
import { graphql, Link } from "gatsby"
import SEO from "../../components/seo"

import "./blog-post.css"

interface BlogPostProps {
  data: {
    markdownRemark: {
      html: string
      frontmatter: {
        title: string
        subject: string
        description: string
      }
      timeToRead: string
    }
  }
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        subject
        description
      }
      timeToRead
    }
  }
`

const blogPost: React.FC<BlogPostProps> = ({ data }) => {
  const post = data.markdownRemark
  return (
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        lang="en=US"
      />
      <div className="blog_container">
        <div id="top-of-page" className="container">
          <Link id="to-blog" to="/blog">
            <span
              style={{
                fontSize: "50px",
                position: "relative",
                top: "20px",
                left: "-15px",
              }}
              role="img"
              aria-label="back"
            >
              🔙
            </span>{" "}
            {/* to Blog */}
          </Link>
        </div>
        <h1 className="title">{post.frontmatter.title}</h1>
        <p className="TimeToRead">{post.timeToRead} min read</p>
        <div
          className="blogPost"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </Layout>
  )
}

export default blogPost
