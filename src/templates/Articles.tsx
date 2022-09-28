import { PageProps } from "gatsby";
import React from "react";
import Layout from "../components/Layout";
import PostList from "../components/PostList";

const Articles = ({
  pageContext,
}: PageProps<{}, { posts: any; pagination: any }>) => {
  const { posts, pagination } = pageContext;
  return (
    <Layout className="container">
      <PostList posts={posts} pagination={pagination} />
    </Layout>
  );
};

export default Articles;
