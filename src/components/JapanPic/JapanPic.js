import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import classes from "./JapanPic.module.css"

const JapanPic = () => {
	const data = useStaticQuery(graphql`
		query {
			japan: file(relativePath: { eq: "japanpic2.jpg" }) {
				childImageSharp {
					fluid(maxWidth: 600) {
						...GatsbyImageSharpFluid
					}
				}
			}
		}
	`)

	return (
		<div className={classes.ImgContainer}>
			<Img
				className={classes.Japan}
				alt='picture of me from Japan'
				fluid={data.japan.childImageSharp.fluid}
			/>
		</div>
	)
}

export default JapanPic
