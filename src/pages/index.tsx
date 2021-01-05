import React, { useState, useEffect } from "react"
import { Link, graphql, PageProps } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "./index.module.css"

interface IndexPageProps extends PageProps {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          id: string
          frontmatter: { title: string; date: string; subject: string }
          excerpt: string
          timeToRead: string
          fields: {
            slug: string
          }
        }
      }[]
    }
  }
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___id], order: DESC }
      limit: 2
      filter: { frontmatter: { hidden: { ne: "yes" } } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date
            subject
          }
          excerpt
          timeToRead
          fields {
            slug
          }
        }
      }
    }
  }
`

const IndexPage = (props: IndexPageProps) => {
  const [posts, setPosts] = useState<HTMLDivElement[]>([])
  const { data } = props

  useEffect(() => {
    const posts = []
    data.allMarkdownRemark.edges.map(node => {
      // console.log(node)
      posts.push(
        <div key={node.node.id}>
          <Link to={node.node.fields.slug} style={{ textDecoration: "none" }}>
            <h3
              style={{
                fontSize: "18px",
                textDecoration: "none",
                position: "relative",
                left: "5px",
                textAlign: "left",
                marginTop: "3px",
                color: "#191E27",
              }}
            >
              {node.node.frontmatter.title}
              <br />
              <span
                style={{
                  fontSize: "small",
                  textDecoration: "none",
                  position: "relative",
                  left: "5px",
                  top: "8px",
                  color: "#1D1A28",
                }}
              >
                {node.node.frontmatter.date} |{" "}
                <span>{node.node.frontmatter.subject} | </span>
                <span>{node.node.timeToRead} min read</span>
              </span>
            </h3>
            <hr style={{ marginTop: "5px" }} />
            <p>{node.node.excerpt}</p>
          </Link>
        </div>
      )
    })
    setPosts(posts)
  }, [data])

  return (
    <Layout>
      <SEO
        title="Home"
        lang="English (En-US)"
        description="Sudacode home page"
      />
      {posts}
    </Layout>
  )
}

export default IndexPage
