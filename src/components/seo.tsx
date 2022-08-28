import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

interface Props {
  title: string;
  description?: string;
  lang?: string;
  children?: JSX.Element;
}

const Seo = ({ description, lang, title, children }: Props) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <>
      <title>{defaultTitle ? `${title} | ${defaultTitle}` : title}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={site.siteMetadata?.social?.twitter || ``}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />
      {process.env.NODE_ENV !== "development" ? (
        <script
          defer
          data-domain="maxmalm.se"
          src="https://plausible.io/js/plausible.js"
        ></script>
      ) : null}
      {children}
    </>
  );
};

Seo.defaultProps = {
  description: ``,
};

export default Seo;
