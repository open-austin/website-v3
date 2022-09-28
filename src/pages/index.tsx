import { graphql, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import ProjectCard from "../components/ProjectCard";
import extractGQLData from "../utils/extractGQLData";

const IndexPage = ({ data }) => {
  const { posts, projects } = extractGQLData<{ posts: any[]; projects: any[] }>(
    data
  );

  return (
    <Layout>
      <div className="h-[330px] relative  text-white overflow-hidden">
        <StaticImage
          src="../assets/images/code-across-2015-pano.png"
          layout="fullWidth"
          alt=""
        />

        <div className=" absolute flex flex-col items-center justify-center w-full h-full inset-0">
          <h1 className="relative mb-4 text-7xl ">We are Open Austin</h1>
          <p className="relative text-xl">
            Open government, open data, and civic apps in Austin, Texas
          </p>
        </div>
      </div>

      <div className="container mx-auto dark:text-gray-200 my-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center p-10 text-center">
            <div className="text-5xl mb-4">🏛️</div>
            <div className="text-lg">
              We advocate to make government work for the 21st century.
            </div>
          </div>
          <div className="flex flex-col items-center p-10 text-center">
            <div className="text-5xl mb-4">📅</div>
            <div className="text-lg">
              We host frequent meetups, hack projects and events. Join us!
            </div>
          </div>
          <div className="flex flex-col items-center p-10 text-center">
            <div className="text-5xl mb-4">🧑‍💻</div>
            <div className="text-lg">
              We develop open-source projects as a Code for America Brigade.
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto my-10">
        <h2 className="text-3xl font-bold mb-4 dark:text-gray-200">
          Most recent posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((post) => (
            <Link to={`/blog${post.slug}`} key={post.slug}>
              <PostCard post={post} />
            </Link>
          ))}
        </div>
        <div className="flex justify-center">
          <Link to="/blog">
            <a className="btn mt-4 dark:text-gray-400">More posts</a>
          </Link>
        </div>
      </div>

      <div className="container mx-auto my-10">
        <h2 className="text-3xl font-bold mb-4 dark:text-gray-200">
          Most recent projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {projects.map((project) => (
            <Link to={`/projects${project.slug}`} key={project.slug}>
              <ProjectCard project={project} />
            </Link>
          ))}
        </div>
        <div className="flex justify-center">
          <Link to="/projects">
            <a className="btn mt-4 dark:text-gray-400">More projects</a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  {
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fields: { collection: { eq: "blog" } } }
      limit: 3
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 100)
          html
          frontmatter {
            title
            date
            published
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
            thumbalt
            author {
              first_name
              last_name
            }
          }
        }
      }
    }

    projects: allMarkdownRemark(
      limit: 3
      filter: { fields: { collection: { eq: "projects" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 250)
          html
          tableOfContents(maxDepth: 2)
          frontmatter {
            title
            description
            access_at
            project_at
            type
            status
            contact
            categories
            date
            image {
              childImageSharp {
                gatsbyImageData
              }
            }
            archived
          }
        }
      }
    }
  }
`;
