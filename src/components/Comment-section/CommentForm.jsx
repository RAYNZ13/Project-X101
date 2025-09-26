import React from "react";

const CommentForm = ({
  handleSubmit,
  newComment,
  setNewComment,
  isPosting,
}) => {
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full border border-white/10 bg-transparent p-2 rounded"
        placeholder="Write a comment..."
        rows={3}
        disabled={isPosting}
      />
      <button
        type="submit"
        disabled={!newComment || isPosting}
        className="
          mt-2
          bg-gradient-to-l from-purple-500 to-pink-500
          hover:from-purple-600 hover:to-pink-600 
          font-semibold px-4 py-2 rounded
          cursor-pointer
          transition-all duration-300 ease-in-out
          transform hover:scale-110
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {isPosting ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
