import * as React from "react";
import { graphql, PageProps } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";

const NotFoundPage: React.FC<PageProps<Queries.NotFoundQuery>> = ({
  data,
  location,
}) => {
  const siteTitle = data.site?.siteMetadata?.title ?? "Title";

  return (
    <Layout location={location} title={siteTitle}>
      <h1>404: Not Found</h1>
      <div
        style={{
          width: "100%",
          height: 0,
          paddingBottom: "75%",
          position: "relative",
        }}
      >
        <iframe
          src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
          width="100%"
          height="100%"
          style={{ position: "absolute" }}
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        ></iframe>
      </div>
    </Layout>
  );
};

export const Head = () => <Seo title="404: Not Found" />;

export default NotFoundPage;

export const query = graphql`
  query NotFound {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
