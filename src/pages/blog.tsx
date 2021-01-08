import React from "react"
import SEO from "../components/seo"
import { Link, graphql } from "gatsby"
import BlogPost from "../components/BlogPost/BlogPost"
import Layout from "../components/layout"
import "./blog.css"
// import * as colors from "../components/colors"

interface BlogProps {
  data: {
    allMarkdownRemark: {
      totalCount: number
      edges: {
        node: {
          id: string
          frontmatter: {
            title: string
            date: string
            subject: string
          }
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
      filter: { frontmatter: { hidden: { ne: "yes" } } }
    ) {
      totalCount
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

const blog: React.FC<BlogProps> = ({ data }) => {
  const RED = "#eb4034"
  const ORANGE = "#cc5500"
  const YELLOW = "#FFCB05"
  const GREEN = "#97e396"
  const BLUE = "#1e90ff"
  const PINK = "#f018af"
  const PURPLE = "#de0fd4"
  const LIGHTBLUE = "#55aebb"
  const FLAMEORANGE = "#fc8353"
  const SALMONIGUESS = "#d66169"
  const BRIGHTERGREEN = "#96d651"
  const PURP = "#a357d3"
  const MATHCOLOR = "#cead6f"
  const LIGHTERBLUE = "#579dd7"
  const SUPERGREEN = "#00ff7f"
  const vcolors = [
    RED,
    ORANGE,
    YELLOW,
    GREEN,
    BLUE,
    PINK,
    PURPLE,
    LIGHTBLUE,
    FLAMEORANGE,
    SALMONIGUESS,
    BRIGHTERGREEN,
    PURP,
    MATHCOLOR,
    LIGHTERBLUE,
    SUPERGREEN,
  ]

  const getRandomNum = (): number => {
    return Math.floor(Math.random() * Math.floor(vcolors.length))
  }

  // in-place shuffle algorithm
  const shuffleArray = (arr: string[]): void => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
  }
  let lastColor = null
  let numPosts = data.allMarkdownRemark.edges.length
  let height = 50 * numPosts + 5 * numPosts
  // get random starting point in array
  let count = getRandomNum()
  // shuffle array of colors
  shuffleArray(vcolors)
  return (
    <Layout showBackground>
      <SEO
        title="Blog"
        description="A blog where I can showcase my personal projects and setup as well as talk about interesting topics in computer science and technology"
      />
      <>
        <h1 className="BlogPosts">Blog Posts</h1>
        <h4 className="numPosts">{data.allMarkdownRemark.totalCount} Posts</h4>
        <div className="BlogPostsContainer">
          {data.allMarkdownRemark.edges.map(({ node }, idx) => {
            const color = vcolors[count++ % vcolors.length]
            return <BlogPost key={idx} node={node} color={color} />
          })}
        </div>
      </>
    </Layout>
  )
}

export default blog
