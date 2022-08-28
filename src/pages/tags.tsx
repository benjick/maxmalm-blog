import React from "react";

// Components
import { Link, graphql, PageProps } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/seo";

type DataProps = {
  site: {
    siteMetadata?: {
      title: string;
    };
  };
  allMarkdownRemark: {
    group: {
      fieldValue: string;
      totalCount: number;
    }[];
  };
};

const TagsPage: React.FC<PageProps<DataProps>> = ({
  data: {
    allMarkdownRemark: { group },
    site,
  },
  location,
}) => {
  const siteTitle = site.siteMetadata?.title ?? "Title";
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
  query {
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
