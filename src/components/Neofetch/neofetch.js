import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Neofetch = props => {
	const data = useStaticQuery(graphql`
		query {
			neofetch: file(relativePath: { eq: "neofetch.png" }) {
				childImageSharp {
					fluid(maxWidth: 1000) {
						...GatsbyImageSharpFluid
					}
				}
			}
		}
	`)

	return (
		<Img
			style={props.style}
			alt='Neofetch Output'
			fluid={data.neofetch.childImageSharp.fluid}
		/>
	)
}

export default Neofetch
