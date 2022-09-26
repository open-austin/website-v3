import React from "react";
import Layout from "../components/Layout";

const Page = ({ pageContext }) => {
  return (
    <Layout>
      <h1 className="text-3xl pt-12 pb-8">{pageContext.frontmatter.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: pageContext.html }}></p>
    </Layout>
  );
};

export default Page;
