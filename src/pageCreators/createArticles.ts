import { CreatePagesArgs } from "gatsby";
import path from 'path'


export const createArticles = async ({ actions, graphql }: CreatePagesArgs) => {
  const { createPage } = actions;

  const articles = await graphql(
    `
      {
        allMarkdownRemark(
          limit: 1000
          filter: { fields: { collection: { eq: "blog" } } }
        ) {
          edges {
            node {
              fields {
                slug
              }
              excerpt(pruneLength: 250)
              html
              tableOfContents(maxDepth: 2)
              frontmatter {
                title
                date
                published
                image {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
                thumbalt
                author {
                  first_name
                  last_name
                }
              }
            }
          }
        }
      }
    `
  );

  articles.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const particles = node.fields.slug.split("/");
    const slug = particles[particles.length - 2];

    createPage({
      path: "/blog/" + slug,
      component: path.resolve("./src/templates/Article.tsx"),
      context: node,
    });
  });
}
