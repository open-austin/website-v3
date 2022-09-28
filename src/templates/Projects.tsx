import { PageProps } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import ProjectsList from "../components/ProjectsList";

const Projects = ({
  pageContext,
}: PageProps<{}, { projects: any[]; pagination: any }>) => {
  const { projects, pagination } = pageContext;

  return (
    <Layout className="container">
      <ProjectsList projects={projects} pagination={pagination} />
    </Layout>
  );
};

export default Projects;
