import { PageProps } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../components/Layout";

type PageContext = {
  frontmatter: {
    image: any;
    title: string;
  };
  html: string;
};

const Article = ({ pageContext }: PageProps<{}, PageContext>) => {
  return (
    <Layout className="container">
      <GatsbyImage image={getImage(pageContext.frontmatter.image)} />

      <h1 className="text-2xl mb-8 mt-12 dark:text-gray-200">
        {pageContext.frontmatter.title}
      </h1>
      <div
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: pageContext.html }}
      ></div>
    </Layout>
  );
};

export default Article;
