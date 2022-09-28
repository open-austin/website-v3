import { CreateNodeArgs, CreatePagesArgs } from "gatsby";
import { createArticles } from "./src/pageCreators/createArticles";
import { createPages } from "./src/pageCreators/createPages";
import { createProjects } from "./src/pageCreators/createProjects";
import { createFilePath } from "gatsby-source-filesystem"

exports.createPages = async (createPagesArgs: CreatePagesArgs) => {
  createArticles(createPagesArgs);
  createPages(createPagesArgs);
  createProjects(createPagesArgs);
};

exports.onCreateNode = ({ node, actions, getNode }: CreateNodeArgs) => {
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
