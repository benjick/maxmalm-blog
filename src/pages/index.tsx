import * as React from "react";
import { Link, graphql, PageProps } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";

function Flag({ lang }: { lang?: string }) {
  switch (lang) {
    case "en":
      return (
        <span role="img" aria-label="English" style={{ marginRight: 5 }}>
          🇬🇧
        </span>
      );
    case "sv":
      return (
        <span role="img" aria-label="Swedish" style={{ marginRight: 5 }}>
          🇸🇪
        </span>
      );
    default:
      return null;
  }
}

const BlogIndex: React.FC<PageProps<Queries.BlogIndexQuery>> = ({
  data,
  location,
}) => {
  const siteTitle = data.site?.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>No blog posts found.</p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <ol style={{ listStyle: `none` }}>
        {posts.map((post) => {
          const title = post.frontmatter?.title ?? post.fields.slug;

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>
                    <Flag lang={post.frontmatter.lang} />
                    {post.frontmatter.date}
                  </small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        post.frontmatter.description ?? post.excerpt ?? "",
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default BlogIndex;

export const Head = () => <Seo title="All posts" />;

export const query = graphql`
  query BlogIndex {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD MMMM, YYYY", locale: "sv")
          title
          description
          lang
        }
      }
    }
  }
`;
