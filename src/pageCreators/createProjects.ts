import { CreatePagesArgs } from "gatsby";
import path from 'path'

export const createProjects = async ({ actions, graphql }: CreatePagesArgs) => {
  const { createPage } = actions;

  const projects = await graphql(
    `
      {
        allMarkdownRemark(
          limit: 1000
          filter: { fields: { collection: { eq: "projects" } } }
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
                description
                access_at
                project_at
                type
                status
                contact
                categories
                date
                image {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
                archived
              }
            }
          }
        }
      }
    `
  );

  projects.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const particles = node.fields.slug.split("/");
    const slug = particles[particles.length - 2];

    createPage({
      path: "/projects/" + slug,
      component: path.resolve("./src/templates/Project.tsx"),
      context: node,
    });
  });
}
