import { PageProps } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../components/Layout";

type PageContext = {
  frontmatter: {
    image: any;
    title: string;
    description: string;
  };
  html: string;
};

const Project = ({ pageContext }: PageProps<{}, PageContext>) => {
  return (
    <Layout className="container">
      <GatsbyImage image={getImage(pageContext.frontmatter.image)}/>
      <h1 className="text-3xl pt-12 pb-8 dark:text-gray-200">{pageContext.frontmatter.title}</h1>
      <p className="prose dark:prose-invert">{pageContext.frontmatter.description}</p>
    </Layout>
  );
};

export default Project;
