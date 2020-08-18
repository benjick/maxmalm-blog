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

const ogImagePlugin = {
  resolve: `@akr4/gatsby-plugin-og-image`,
  options: {
    siteUrl: `https://maxmalm.se`,
    render: renderOgImage,
    concurrency: 10,
  },
};

module.exports = ogImagePlugin;
