const { createFilePath } = require("gatsby-source-filesystem");
const path = require("path");

exports.createPages = async ({ actions, graphql }) => {
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
                thumb
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
                screenshot
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

  const pages = await graphql(
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

  pages.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const particles = node.fields.slug.split("/");
    const slug = particles[particles.length - 2];

    createPage({
      path: slug,
      component: path.resolve("./src/templates/Page.tsx"),
      context: node,
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({
      node,
      getNode,
    });

    createNodeField({
      name: `slug`,
      node,
      value,
    });

    const parent = getNode(node?.parent);

    // Create a field on this node for the "collection" of the parent
    // NOTE: This is necessary so we can filter `allMarkdownRemark` by
    // `collection` otherwise there is no way to filter for only markdown
    // documents of type `post`.
    createNodeField({
      node,
      name: "collection",
      value: parent?.sourceInstanceName,
    });
  }
};
