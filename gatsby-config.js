const renderOgImage = ({ title }) => {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
</head>
<body>
<style>
body {
  padding: 0;
  margin: 0;
}

div {
  display: grid;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
  grid-template-columns: -webkit-max-content auto;
  grid-template-columns: max-content auto;
  grid-template-rows: auto -webkit-max-content;
  grid-template-rows: auto max-content;
  background: #333 url(https://images.unsplash.com/photo-1497406703182-f805b8fbba89?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7598c4ba7994f83dab58ae34f1abd023&auto=format&fit=crop&w=1584&q=80) center;
  background-size: cover;
  color: white;
  width: 1100px;
  height: 530px;
  padding: 50px;
}
div:before, div:after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  border: 5px solid white;
}
div:before {
  grid-row: 1 / 2;
  border-right: none;
  border-bottom: none;
}
div:after {
  grid-row: 1 / span 2;
  border-left: none;
}
div h2 {
  margin: 1rem 1rem -0.5rem 0;
  width: 900px;
  display: block;
  font-family: "Pragati Narrow", sans-serif;
  font-size: 5rem;
  text-transform: uppercase;
  line-height: 92px;
}
</style>
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Pragati+Narrow">
<div>
	<h2>${title}</h2>
</div>
</body>
</html>
`;
};

module.exports = {
  siteMetadata: {
    title: `maxmalm.se`,
    author: {
      name: `Max Malm`,
    },
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://gatsby-starter-blog-demo.netlify.com/`,
    social: {
      twitter: `benjick`,
    },
  },
  plugins: [
    {
      resolve: `@akr4/gatsby-plugin-og-image`,
      options: {
        siteUrl: `https://maxmalm.se`,
        render: renderOgImage,
        concurrency: 10,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-55961206-2`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `maxmalm.se`,
        short_name: `maxmalm`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {        
        langKeyDefault: 'sv',
        useLangKeyLayout: false
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
