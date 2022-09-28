import React from "react";
import dayjs from "dayjs";
import PostType from "../interfaces/post";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const PostCard = React.forwardRef(
  ({ post, onClick }: { post: PostType; onClick?: any }) => {
    console.log(post)
    const img = getImage(post.image)
    return (
      <div
        className="transform transition duration-500 hover:scale-105 cursor-pointer"
        onClick={onClick}
      >
        {post.image && (
          <div className="mb-4 h-[200px] overflow-hidden">
            <GatsbyImage image={img} alt={post.title} objectFit="cover" className="h-full w-full" />
          </div>
        )}
        <h2 className="dark:text-gray-200 text-xl font-bold mb-4">
          {post.title}
        </h2>

        <time className="dark:text-gray-500">
          {dayjs(post.date).format("DD MMM YYYY")}
        </time>
      </div>
    );
  }
);

PostCard.displayName = "PostCard";

export default PostCard;
