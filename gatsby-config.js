module.exports = {
  siteMetadata: {
    title: `Sudacode`,
    description: `My personal blog/portfolio to showcase my personal projects as well as blog about topics that I find interesting.`,
    author: `Kyle Yasuda <ksyasuda@umich.edu>`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/src/pages/BlogPosts`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `sudacode`,
        short_name: `sudacode`,
        start_url: `/`,
        background_color: `#282c34`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/suda-circle.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-transformer-remark",
    },
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Open Sans", "Roboto"],
        },
      },
    },
    {
      resolve: "gatsby-plugin-react-leaflet",
      options: {
        linkStyles: true,
      },
    },
    {
      resolve: "gatsby-plugin-offline",
      options: {
        precachePages: ["/blog/*", "/index/", "/travel/"],
      },
    },
  ],
}
