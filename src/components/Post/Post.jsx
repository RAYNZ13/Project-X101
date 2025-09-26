import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../backend/Supabase-client";
import { LikeButton } from "./index";
import { CommentSection } from "../Comment-section/index";
import { formatDistanceToNow } from "date-fns";
import { PostPageSkeleton } from "../skeleton/index";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

const fetchPostById = async (id) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

const Post = ({ postId }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
  });

  if (isLoading) return <PostPageSkeleton />;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] px-4">
        <div
          className="bg-red-500/10 border border-red-500/30 text-red-400 
                     px-4 py-3 rounded-lg max-w-md text-center shadow-md animate-fadeIn"
        >
          <p className="text-base sm:text-lg font-semibold">⚠️ Error</p>
          <p className="text-sm sm:text-base mt-1">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <h2
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                     font-bold text-center 
                     bg-gradient-to-r from-purple-500 to-pink-500 
                     bg-clip-text text-transparent reveal animate-fadeIn"
      >
        {data?.title}
      </h2>

      {/* Image */}
      {data?.image_url && (
        <div className="w-full overflow-hidden rounded-lg reveal animate-fadeIn">
          <img
            src={data.image_url}
            alt={data?.title}
            className="mt-4 object-cover w-full max-h-[28rem] sm:max-h-[36rem] 
                         transition-transform duration-500 hover:scale-105 rounded-lg"
          />
        </div>
      )}

      {/* Content (TinyMCE HTML) */}
      <div
        className="prose prose-invert prose-p:leading-relaxed prose-headings:mb-4 
                     prose-img:rounded-lg prose-a:text-purple-400 hover:prose-a:text-pink-400 
                     max-w-none text-gray-300 reveal animate-fadeIn"
      >
        {parse(DOMPurify.sanitize(data?.content || ""))}
      </div>

      {/* Metadata */}
      <p className="text-gray-500 text-xs sm:text-sm text-right reveal animate-fadeIn">
        Posted{" "}
        {formatDistanceToNow(new Date(data?.created_at), { addSuffix: true })}
      </p>

      {/* Actions */}
      <div className="space-y-4 reveal animate-fadeIn">
        <LikeButton postId={postId} />
        <CommentSection postId={postId} />
      </div>
    </div>
  );
};

export default Post;
