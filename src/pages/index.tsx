import React, { useState, useEffect } from "react"
import { Link, graphql, PageProps } from "gatsby"
import IndexPost from "../components/IndexPost/IndexPost"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "./index.css"

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
        <IndexPost
          id={node.node.id}
          title={node.node.frontmatter.title}
          subject={node.node.frontmatter.subject}
          date={node.node.frontmatter.date}
          timeToRead={+node.node.timeToRead}
          excerpt={node.node.excerpt}
          slug={node.node.fields.slug}
        />
      )
    })
    setPosts(posts)
  }, [data])

  return (
    <Layout showBackground={false}>
      <SEO
        title="Home"
        lang="English (En-US)"
        description="Sudacode home page"
      />
      <div className="index-content">
        <div className="index-posts-container">{posts}</div>
      </div>
    </Layout>
  )
}

export default IndexPage
