import React from "react";
import { PostItem } from "../Post/index";
import { PostSkeleton } from "../skeleton/index";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../backend/Supabase-client";

const fetchCommunityPosts = async (communityId) => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
    *,
    Communities(name),
    Votes(vote_value, user_id)
  `
    )
    .eq("community_id", communityId)
    .order("created_at", { ascending: false });

  if (error) throw new Error("Error fetching posts");

  return data;
};

const CommunityDisplay = ({ communityId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["communityPost", communityId],
    queryFn: () => fetchCommunityPosts(communityId),
  });

  console.log(data);

  if (isLoading) {
    // render 3 placeholders
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 4 }).map((_, id) => (
          <PostSkeleton key={id} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 mt-10">
        <p className="font-semibold text-lg">Error fetching community posts</p>
        <p className="text-sm mt-1">{error.message}</p>
      </div>
    );
  }

  const communityName =
    data && data.length > 0 && data[0].Communities
      ? data[0].Communities.name
      : "This";

  return (
    <div className="reveal animate-fadeIn">
      <h2
        className="
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
          font-bold 
          mb-10 
          text-center 
          bg-gradient-to-r from-purple-500 to-pink-500 
          bg-clip-text 
          text-transparent
        "
      >
        {communityName} Community Posts
      </h2>

      {data && data.length > 0 ? (
        <div
          className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto 
                     pt-10 sm:pt-12 
                     grid gap-6 sm:gap-8 
                     grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
                     auto-rows-fr reveal animate-fadeIn"
        >
          {data.map((post) => (
            <PostItem post={post} key={post.id} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center mt-10">
          No posts found in this community.
        </p>
      )}
    </div>
  );
};

export default CommunityDisplay;
