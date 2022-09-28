import { CreatePagesArgs } from "gatsby";
import { AllMarkdownRemarkRes } from "../types";
import path from 'path'

const postsPerPage = 6;

export const createArticlesIndexAndPagination = async ({ actions, graphql }: CreatePagesArgs) => {
  const { createPage } = actions;

  const rawArticles: AllMarkdownRemarkRes<{ fields: { slug: string }, frontmatter: {}, excerpt: string, html: string }> = await graphql(
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

  if (rawArticles.errors) {
    throw rawArticles.errors;
  }

  const articles = rawArticles?.data?.allMarkdownRemark.edges.map(el => el.node).map(el => ({
    ...el.frontmatter,
    slug: el.fields.slug,
    excerpt: el.excerpt,
    html: el.html,
  })) || []
  const numPages = Math.ceil(articles.length / postsPerPage);

  const postsArray = Array.from({
    length: numPages,
  }).map((_, i) => {
    const items = articles.slice(i * postsPerPage, i * postsPerPage + postsPerPage);
    return items;
  });

  postsArray.forEach((items, i) => {
    const blogPath = i === 0 ? `/blog/` : `/blog/${i + 1}`;
    const currentPage = i + 1;



    createPage({
      path: blogPath,
      component: path.resolve("./src/templates/Articles.tsx"),
      context: {
        posts: items,
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage,
        prevLink:
          currentPage === 1
            ? null
            : `/blog/${currentPage - 1 === 1 ? "" : currentPage - 1}`,
        nextLink:
          currentPage === numPages ? null : `/blog/${currentPage + 1}`,
        pagination: {
          current: currentPage,
          pages: numPages,
        }
      },
    });
  });
}
