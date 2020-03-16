import React from "react"
import PropTypes from "prop-types"

// Components
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
  location
}) => (
  <Layout location={location} title="Alla taggar">
    <SEO
      title={title}
    />
    <ul>
      {group.map(tag => (
        <li key={tag.fieldValue}>
          <Link to={`/tag/${tag.fieldValue}/`}>
            {tag.fieldValue} ({tag.totalCount})
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

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
`
