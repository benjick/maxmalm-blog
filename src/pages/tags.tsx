import React from "react";

// Components
import { Link, graphql, PageProps } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";

const TagsPage: React.FC<PageProps<Queries.TagsIndexQuery>> = ({
  data: {
    allMarkdownRemark: { group },
    site,
  },
  location,
}) => {
  const siteTitle = site?.siteMetadata?.title ?? "Title";
  return (
    <Layout location={location} title={siteTitle}>
      <ul>
        {group.map((tag) => (
          <li key={tag.fieldValue}>
            <Link to={`/tag/${tag.fieldValue}/`}>
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default TagsPage;

export const Head = () => <Seo title="Alla taggar" />;

export const pageQuery = graphql`
  query TagsIndex {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
