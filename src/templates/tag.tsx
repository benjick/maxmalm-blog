import React from "react";
import PropTypes from "prop-types";

// Components
import Layout from "../components/layout";
import { Link, graphql, PageProps } from "gatsby";

type Context = {
  tag: string;
};

const Tag: React.FC<PageProps<Queries.TagTemplateQuery, Context>> = ({
  pageContext,
  data,
  location,
}) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`;

  return (
    <Layout location={location} title={tagHeader}>
      <ul>
        {edges.map(({ node }) => {
          const { slug } = node.fields;
          const { title } = node.frontmatter;
          return (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          );
        })}
      </ul>
      <Link to="/tags">Alla taggar</Link>
    </Layout>
  );
};

export default Tag;

export const pageQuery = graphql`
  query TagTemplate($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
