import React from "react";
import Layout from "../components/Layout";

const Article = ({ pageContext }) => {

  return (
    <Layout className="container">
      <h1 className="text-2xl mb-8 mt-12 dark:text-gray-200">{pageContext.frontmatter.title}</h1>
      <div className="prose dark:prose-invert" dangerouslySetInnerHTML={{ __html: pageContext.html }}></div>
    </Layout>
  );
};

export default Article;
