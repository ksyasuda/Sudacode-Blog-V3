const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require("path")

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `MarkdownRemark`) {
    const { createNodeField } = actions
    // console.log(createFilePath({ node, getNode, basePath: `pages` }))
    if (node.internal.type === "MarkdownRemark") {
      const slug = createFilePath({ node, getNode, basePath: "pages" })
      createNodeField({ node, name: "slug", value: slug })
    }
  }
}

exports.createPages = async ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)
  //   console.log(JSON.stringify(result, null, 4))
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const parts = node.fields.slug.split("/")
    const slug = "/blog/" + parts[2].substring(parts[2].indexOf(".") + 1)
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post/blog-post.tsx`),
      context: {
        // slug: node.fields.slug,
        slug: slug,
      },
    })
  })
}

// exports.onCreateNode = ({ node, getNode }) => {
//   if (node.internal.type === `MarkdownRemark`) {
//     console.log(node.internal.type)
//     const fileNode = getNode(node.parent)
//     console.log("\n", fileNode.relativePath)
//   }
// }
