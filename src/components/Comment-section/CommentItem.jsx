import React, { useState } from "react";
import { CommentForm } from "./index";
import { useAuth } from "../../context/authContext";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { supabase } from "../../backend/Supabase-client";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

import toast from "react-hot-toast";

const createReply = async (
  replyData,
  postId,
  parentCommentId,
  userId,
  author
) => {
  if (!userId || !author) {
    throw new Error("User must be logged in to comment");
  }

  const { data, error } = await supabase.from("Comments").insert({
    post_id: postId,
    content: replyData.content,
    parent_comment_id: replyData.parent_comment_id || null,
    user_id: userId,
    author: author, // <-- Ensure this is passed correctly
  });

  if (error) {
    throw new Error(error.message || "Error creating comment");
  }
  return data;
};

const CommentItem = ({ comment, postId }) => {
  const [replyComment, setReplyComment] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    mutate,
    isPending: isPosting,
    isError,
  } = useMutation({
    mutationFn: (replyData) => {
      return createReply(
        replyData,
        postId,
        comment.id,
        user.id,
        user?.user_metadata?.full_name || "Anonymous"
      );
    },
    onSuccess: () => {
      console.log("Reply added successfully");
      toast.success("Reply added successfully");
      queryClient.invalidateQueries({ queryKey: ["Comments", postId] });
      setReplyComment("");
      setShowReply(false);
    },
    onError: (error) => {
      console.error("Error adding reply:", error.message);
      toast.error("Error adding reply: " + error.message);
    },
  });

  const handleReplySubmit = (e) => {
    e.preventDefault();
    // Handle reply submission logic here
    if (!replyComment || isPosting) return;

    mutate({ content: replyComment, parent_comment_id: comment.id });
  };

  return (
    <div className="pl-4 border-l border-white/10">
      <div className="mb-5">
        <div className="flex items-center space-x-2">
          {/* Display the commenter's username */}
          <span className="text-sm font-bold bg-gradient-to-r from-purple-500  to-pink-500 bg-clip-text text-transparent">
            {comment.author}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(comment.created_at).toLocaleString()}
          </span>
        </div>
        <p className="text-gray-300">{comment.content}</p>
        <button
          onClick={() => setShowReply((prev) => !prev)}
          className="text-purple-500 text-sm mt-1"
        >
          {showReply ? "Cancel" : "Reply"}
        </button>
      </div>
      {showReply && user && (
        <CommentForm
          handleSubmit={handleReplySubmit}
          newComment={replyComment}
          setNewComment={setReplyComment}
          isPosting={isPosting}
        />
      )}

      {comment.children && comment.children.length > 0 && (
        <div>
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="
    flex items-center space-x-2 
    text-gray-400 hover:text-white 
    transition-colors duration-200 
    mt-2 
    text-sm font-medium
  "
          >
            {isCollapsed ? (
              <>
                <FaArrowCircleDown className="w-4 h-4" />
                <span>Show Replies</span>
              </>
            ) : (
              <>
                <FaArrowCircleUp className="w-4 h-4" />
                <span>Hide Replies</span>
              </>
            )}
          </button>
          {!isCollapsed && (
            <div>
              {comment.children.map((child) => (
                <CommentItem key={child.id} comment={child} postId={postId} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
