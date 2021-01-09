import React from "react"
import SEO from "../components/seo"
import MyMap from "../components/MyMap/MyMap"
import Layout from "../components/layout"
import "./travel.module.css"

const travel: React.FC = () => (
  <Layout showBackground={false}>
    <SEO
      title="Travel"
      description="A travel app created with React.js and Node.js using Express and Nedb for the backend"
    />
    {/* <MyMap />  */}
  </Layout>
)

export default travel
