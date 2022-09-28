import React from 'react'
import ProjectsList from '../components/ProjectsList'

const Projects = ({ pageContext }) => {
  const { projects, pagination } = pageContext;

  return (
    <ProjectsList projects={projects} pagination={pagination} />
  )
}

export default Projects
