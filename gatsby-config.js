const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("./tailwind.config.js");

const fullConfig = resolveConfig(tailwindConfig);

module.exports = {
  siteMetadata: {
    author: `@samlarsendisney`,
    title: `Conductor Search`,
    name: `Conductor Search`,
    siteUrl: `https://tbd.com`,
    description: `Utility to search websites for composer names`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-buildtime-timezone`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [require("tailwindcss")()],
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./results.json`,
      },
    },
  ],
};
