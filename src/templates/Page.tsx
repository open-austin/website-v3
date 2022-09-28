import React from "react";
import Layout from "../components/Layout";

const Page = ({ pageContext }) => {
  return (
    <Layout className="container mx-auto">
      <h1 className="text-3xl pt-12 pb-8 dark:text-gray-200">{pageContext.frontmatter.title}</h1>
      <p dangerouslySetInnerHTML={{ __html: pageContext.html }} className="prose dark:prose-invert"></p>
    </Layout>
  );
};

export default Page;
