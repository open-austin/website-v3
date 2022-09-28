import React from "react";
import Layout from "../components/Layout";

const Project = ({ pageContext }) => {
  return (
    <Layout className="container">
      <h1 className="text-3xl pt-12 pb-8 dark:text-gray-200">{pageContext.frontmatter.title}</h1>
      <p className="prose dark:prose-invert">{pageContext.frontmatter.description}</p>
    </Layout>
  );
};

export default Project;
