import * as path from "path";
const { createFilePath } = require(`gatsby-source-filesystem`);
import { GatsbyNode } from "gatsby";

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.tsx`);
  const tagPageTemplate = path.resolve(`./src/templates/tag.tsx`);

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      query Creation {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
        tagsGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    );
    return;
  }

  const data = result.data as Queries.CreationQuery;

  const posts = data.allMarkdownRemark.nodes;

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].id;

      let ogImagePluginContext;
      if (post.frontmatter?.title) {
        ogImagePluginContext = {
          title: post.frontmatter.title,
        };
      }

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
          ogImagePlugin: ogImagePluginContext,
        },
      });
    });

    const tags = data.tagsGroup.group;
    // Make tag pages
    tags.forEach((tag) => {
      createPage({
        path: `/tag/${tag.fieldValue}/`,
        component: tagPageTemplate,
        context: {
          tag: tag.fieldValue,
        },
      });
    });
  }
};

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions,
  getNode,
}) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions }) => {
    const { createTypes } = actions;

    // Explicitly define the siteMetadata {} object
    // This way those will always be defined even if removed from gatsby-config.js

    // Also explicitly define the Markdown frontmatter
    // This way the "MarkdownRemark" queries will return `null` even when no
    // blog posts are stored inside "content/blog" instead of returning an error
    createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter!
      fields: Fields!
    }

    type Paper {
      name: String!
      published: Boolean
      url: String
    }

    type Frontmatter {
      title: String!
      description: String
      date: Date! @dateformat
      lang: String
      tags: [String!]
      refs: [String!]
      paper: Paper
    }

    type Fields {
      slug: String!
    }
  `);
  };
