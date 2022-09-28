import { CreatePagesArgs } from "gatsby";
import path from 'path'
import { AllMarkdownRemarkRes } from "../types";

const projectsPerPage = 6;

export const createProjectsIndexAndPagination = async ({ actions, graphql }: CreatePagesArgs) => {
  const { createPage } = actions;

  const rawProjects: AllMarkdownRemarkRes<{ fields: { slug: string }, frontmatter: {}, excerpt: string, html: string }> = await graphql(
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

  if (rawProjects.errors) {
    throw rawProjects.errors;
  }

  const projects = rawProjects?.data?.allMarkdownRemark.edges.map(el => el.node).map(el => ({
    ...el.frontmatter,
    slug: el.fields.slug,
    excerpt: el.excerpt,
    html: el.html,
  })) || []

  const numPages = Math.ceil(projects.length / projectsPerPage);

  const itemsArray = Array.from({
    length: numPages,
  }).map((_, i) => {
    const items = projects.slice(i * projectsPerPage, i * projectsPerPage + projectsPerPage);
    return items;
  });

  itemsArray.forEach((items, i) => {
    const blogPath = i === 0 ? `/projects/` : `/projects/${i + 1}`;
    const currentPage = i + 1;



    createPage({
      path: blogPath,
      component: path.resolve("./src/templates/Projects.tsx"),
      context: {
        projects: items,
        limit: projectsPerPage,
        skip: i * projectsPerPage,
        numPages,
        currentPage,
        prevLink:
          currentPage === 1
            ? null
            : `/projects/${currentPage - 1 === 1 ? "" : currentPage - 1}`,
        nextLink:
          currentPage === numPages ? null : `/projects/${currentPage + 1}`,
        pagination: {
          current: currentPage,
          pages: numPages,
        }
      },
    });
  });
}
