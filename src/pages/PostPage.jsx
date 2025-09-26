import React from "react";
import { useParams } from "react-router-dom";
import { Post } from "../components/index";

const PostPage = () => {
  const { id } = useParams();

  return (
    <div className="pt-10">
      <Post postId={Number(id)} />
    </div>
  );
};

export default PostPage;
