import React from "react";
import Layout from "../components/Layout";

const Article = ({ pageContext }) => {

  return (
    <Layout>
      <h1 className="text-2xl mb-8 mt-12">{pageContext.frontmatter.title}</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: pageContext.html }}></div>
    </Layout>
  );
};

export default Article;
