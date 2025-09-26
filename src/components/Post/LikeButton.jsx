import React from "react";
import { IoHeartDislikeSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../backend/Supabase-client";
import { useAuth } from "../../context/authContext";
import toast from "react-hot-toast";

// ✅ Insert or Update the vote
const vote = async (voteValue, postId, user_id) => {
  // 1. check if vote already exists
  const { data: existingVote, error: fetchError } = await supabase
    .from("Votes")
    .select("id, vote_value")
    .eq("post_id", postId)
    .eq("user_id", user_id)
    .maybeSingle();

  if (fetchError) throw new Error(fetchError.message);

  if (existingVote) {
    // 2. update existing vote
    const { error: updateError } = await supabase
      .from("Votes")
      .update({ vote_value: voteValue })
      .eq("id", existingVote.id);

    if (updateError) throw new Error(updateError.message);
  } else {
    // 3. insert new vote
    const { error: insertError } = await supabase.from("Votes").insert({
      post_id: postId,
      user_id,
      vote_value: voteValue,
    });

    if (insertError) throw new Error(insertError.message);
  }
};

// ✅ fetch the total votes
const fetchVotes = async (postId) => {
  const { data, error } = await supabase
    .from("Votes")
    .select("vote_value, user_id")
    .eq("post_id", postId);

  if (error) throw new Error(error.message);
  return data;
};

const LikeButton = ({ postId }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // fetch votes
  const { data: votes = [] } = useQuery({
    queryKey: ["votes", postId],
    queryFn: () => fetchVotes(postId),
  });

  // likes & dislikes count
  const likeCount = votes.filter((v) => v.vote_value === 1).length;
  const disLikeCount = votes.filter((v) => v.vote_value === -1).length;

  // check if current user has already voted
  const userVote = votes.find((v) => v.user_id === user?.id)?.vote_value;

  // mutation for like/dislike
  const { mutate } = useMutation({
    mutationFn: (voteValue) => {
      if (!user) throw new Error("You must be logged in to Vote!");
      return vote(voteValue, postId, user.id);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["votes", postId] });
      if (variables === 1) {
        toast.success("You liked the post!");
      } else {
        toast.success("You disliked the post!");
      }
    },

    onError: (error) => {
      toast.error(error.message || "Something went wrong");
      console.log(error.message);
    },
  });

  return (
    <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
      <button
        onClick={() => mutate(1)}
        className={`flex items-center gap-2 transition ${
          userVote === 1 ? "text-pink-500" : "text-gray-400 hover:text-pink-500"
        }`}
      >
        <FaHeart /> <span>{likeCount}</span>
      </button>
      <button
        onClick={() => mutate(-1)}
        className={`flex items-center gap-2 transition ${
          userVote === -1
            ? "text-purple-500"
            : "text-gray-400 hover:text-purple-400"
        }`}
      >
        <IoHeartDislikeSharp /> <span>{disLikeCount}</span>
      </button>
    </div>
  );
};

export default LikeButton;
