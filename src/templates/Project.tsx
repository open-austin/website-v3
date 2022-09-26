import React from "react";
import Layout from "../components/Layout";

const Project = ({ pageContext }) => {
  console.log(pageContext);
  return (
    <Layout>
      <h1 className="text-3xl pt-12 pb-8">{pageContext.frontmatter.title}</h1>
      <p>{pageContext.frontmatter.description}</p>
    </Layout>
  );
};

export default Project;
