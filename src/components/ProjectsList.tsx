import React from "react";
import Pagination from "./Pagination";
import ProjectType from "../interfaces/project";
import ProjectCard from "./ProjectCard";
import { Link } from "gatsby";

type Props = {
  projects: ProjectType[];
  pagination: {
    current: number;
    pages: number;
  };
};

export default function ProjectsList({ projects, pagination }: Props) {
  return (
    <div >
      <h1 className="text-4xl mb-8 mt-12 font-bold dark:text-gray-200">
        Projects
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-8">
        {projects.map((project) => {
          return (
            <Link to={`/projects${project.slug}`} key={project.slug}>
              <ProjectCard project={project} />
            </Link>
          );
        })}
      </div>

      <Pagination
        current={pagination.current}
        pages={pagination.pages}
        link={{
          href: (page) => (page === 1 ? "/projects" : `/projects/${page}`),
          as: (page) => (page === 1 ? '' : "/projects/" + page),
        }}
      />
    </div>
  );
}
