import React from "react"
import Layout from "../../components/layout"
import { graphql, Link } from "gatsby"
import classes from "./blog-post.module.css"
import SEO from "../../components/seo"
import Fab from "@material-ui/core/Fab"
import NavigationIcon from "@material-ui/icons/Navigation"

const blogPost = ({ data }) => {
	const post = data.markdownRemark
	return (
		<Layout isBlog={true} id='top-of-page'>
			<SEO
				title={post.frontmatter.title}
				description={post.frontmatter.description}
				lang='en=US'
			/>
			<div className={classes.blog_container}>
				<div id='top-of-page' className={classes.container}>
					<Link className={classes.link} to='/blog'>
						<span
							style={{
								fontSize: "50px",
								position: "relative",
								top: "20px",
								left: "-15px",
							}}
							role='img'
							aria-label='back'
						>
							🔙
						</span>{" "}
						{/* to Blog */}
					</Link>
				</div>
				<h1 className={classes.title}>{post.frontmatter.title}</h1>
				<p className={classes.TimeToRead}>{post.timeToRead} min read</p>
				<div
					className={classes.blogPost}
					dangerouslySetInnerHTML={{ __html: post.html }}
				/>
			</div>
		</Layout>
	)
}

export const query = graphql`
	query($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			html
			frontmatter {
				title
				subject
			}
			timeToRead
		}
	}
`

export default blogPost
