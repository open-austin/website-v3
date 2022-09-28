import React from "react";
import PostList from "../components/PostList";

const Articles = ({ pageContext }) => {
  const { posts, pagination } = pageContext;
  return <PostList posts={posts} pagination={pagination} />;
};

export default Articles;
