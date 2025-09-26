import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../backend/Supabase-client";
import { PostItem } from "../index";
import { PostSkeleton } from "../skeleton/index";

const fetchPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      title,
      content,
      image_url,
      avatar_url,
      author,
      created_at,
      Votes (vote_value, user_id)
    `
    )
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

function PostList({ searchQuery = "" }) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  // Filter posts client-side
  const filteredPosts = useMemo(() => {
    if (!data) return [];
    if (!searchQuery.trim()) return data;

    const q = searchQuery.toLowerCase();
    return data.filter(
      (post) =>
        post.title?.toLowerCase().includes(q) ||
        post.content?.toLowerCase().includes(q) ||
        post.author?.toLowerCase().includes(q)
    );
  }, [data, searchQuery]);

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, id) => (
          <PostSkeleton key={id} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 p-4">
        Failed to load posts. Try refreshing.
      </div>
    );
  }

  if (!filteredPosts || filteredPosts.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-6">
        No posts match your search.
      </p>
    );
  }

  return (
    <div
      className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto 
             pt-10 sm:pt-12 
             grid gap-6 sm:gap-8 
             grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
             auto-rows-fr"
    >
      {filteredPosts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  );
}

export default PostList;
