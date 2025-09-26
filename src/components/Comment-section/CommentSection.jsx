import React from "react";
import { useAuth } from "../../context/authContext";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { supabase } from "../../backend/Supabase-client";
import toast from "react-hot-toast";
import { CommentItem, CommentForm } from "./index";

const createComment = async (comment, postId, userId, author) => {
  if (!userId || !author) {
    throw new Error("User must be logged in to comment");
  }

  const { data, error } = await supabase.from("Comments").insert({
    post_id: postId,
    content: comment.content,
    parent_comment_id: comment.parent_comment_id || null,
    user_id: userId,
    author: author, // <-- Ensure this is passed correctly
  });

  if (error) {
    throw new Error(error.message || "Error creating comment");
  }
  return data;
};

const fetchComments = async (postId) => {
  const { data, error } = await supabase
    .from("Comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
};

const buildCommentTree = (flatComments) => {
  const commentMap = new Map();
  const roots = [];

  flatComments.forEach((element) => {
    commentMap.set(element.id, { ...element, children: [] });
  });

  flatComments.forEach((element) => {
    if (element.parent_comment_id) {
      const parent = commentMap.get(element.parent_comment_id);

      if (parent) {
        parent.children.push(commentMap.get(element.id));
      }
    } else {
      roots.push(commentMap.get(element.id));
    }
  });
  return roots;
};

const CommentSection = ({ postId }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = React.useState("");

  const { data: comments = [], isPending: commentsPending } = useQuery({
    queryKey: ["Comments", postId],
    queryFn: () => fetchComments(postId),
    refetchInterval: 5000,
  });

  const {
    mutate,
    isPending: isPosting,
    isError,
  } = useMutation({
    mutationFn: (commentData) => {
      return createComment(
        commentData,
        postId,
        user.id,
        user?.user_metadata?.full_name || "Anonymous"
      );
    },
    onSuccess: () => {
      console.log("Comment added successfully");
      toast.success("Comment added successfully");
      queryClient.invalidateQueries({ queryKey: ["Comments", postId] });
      setNewComment("");
    },
    onError: (error) => {
      console.error("Error adding comment:", error.message);
      toast.error("Error adding comment: " + error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newComment || isPosting) return;

    mutate({ content: newComment, parent_comment_id: null });
  };

  const commentTree = comments ? buildCommentTree(comments) : [];

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-semibold mb-4">Comments</h3>
      {user ? (
        <CommentForm
          handleSubmit={handleSubmit}
          newComment={newComment}
          setNewComment={setNewComment}
          isPosting={isPosting}
        />
      ) : (
        <p className="mb-4 text-gray-600">
          You must be logged in to post a comment.
        </p>
      )}
      <div className="space-y-4">
        {commentsPending ? (
          <p>Loading comments...</p>
        ) : (
          commentTree.map((comment, index) => (
            <CommentItem key={comment.id} comment={comment} postId={postId} />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
