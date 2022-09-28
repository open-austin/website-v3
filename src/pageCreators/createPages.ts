import { CreatePagesArgs } from "gatsby";
import path from 'path'
import { AllMarkdownRemarkRes } from "../types";

export const createPages = async ({ actions, graphql }: CreatePagesArgs) => {
  const { createPage } = actions;

  const pages: AllMarkdownRemarkRes<{ fields: { slug: string } }> = await graphql(
    `
      {
        allMarkdownRemark(
          limit: 1000
          filter: { fields: { collection: { eq: "pages" } } frontmatter: { published: { eq: true } } }
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
              }
            }
          }
        }
      }
    `
  );

  if (pages.errors) {
    throw pages.errors;
  }

  pages?.data?.allMarkdownRemark.edges.forEach(({ node }) => {
    const particles = node.fields.slug.split("/");
    const slug = particles[particles.length - 2];

    createPage({
      path: slug,
      component: path.resolve("./src/templates/Page.tsx"),
      context: node,
    });
  });
}
