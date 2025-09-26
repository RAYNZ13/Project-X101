import { Link } from "react-router-dom";
import { FaHeart, FaRegCommentDots } from "react-icons/fa";
import defaultAvatar from "../../assets/user.png";
import { useAuth } from "../../context/authContext";
import { formatDistanceToNow } from "date-fns";

const PostItem = ({ post }) => {
  const { user } = useAuth();

  if (!post) return null;
  console.log(post);

  // Avatar logic (resize if Google avatar style)
  const avatarUrl = post?.avatar_url || defaultAvatar;

  // Vote counts
  const likeCount = post.Votes?.filter((v) => v.vote_value === 1).length || 0;

  // Current user’s vote
  const userVote = post.Votes?.find((v) => v.user_id === user?.id)?.vote_value;

  return (
    <Link to={`/post/${post.id}`} className="block h-full w-full">
      <div
        className="flex flex-col h-full bg-zinc-900/50 rounded-xl 
                   hover:shadow-[0_8px_10px_rgba(236,72,153,0.2),0_8px_40px_rgba(139,92,246,0.1),0_8px_60px_rgba(168,85,247,0.1)] 
                   hover:scale-[1.02] transition-all duration-300 overflow-hidden 
                   border border-white/10"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={post.author || "Author"}
              className="w-[35px] h-[35px] rounded-full object-cover block"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = defaultAvatar;
              }}
            />
          ) : (
            <div className="w-[35px] h-[35px] rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
          )}

          <div className="flex flex-col overflow-hidden">
            <h3 className="text-white font-semibold text-sm sm:text-base">
              {post.author || "Anonymous"}
            </h3>
            <p className="text-xs text-gray-400">
              {post.created_at
                ? formatDistanceToNow(new Date(post.created_at), {
                    addSuffix: true,
                  })
                : "Just now"}
            </p>
          </div>
        </div>

        {/* Image */}
        {post.image_url && (
          <div className="w-full aspect-video overflow-hidden">
            <img
              src={post.image_url}
              alt={post.title || "Post image"}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col flex-grow p-2 sm:p-5 space-y-3">
          <h2
            className="text-lg sm:text-xl font-bold 
                       bg-gradient-to-r from-purple-500 to-pink-500 
                       bg-clip-text text-transparent break-words"
          >
            {post.title || "Untitled Post"}
          </h2>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
            <div
              className={`flex items-center gap-2 transition ${
                userVote === 1
                  ? "text-pink-500"
                  : "text-gray-400 hover:text-pink-500"
              }`}
            >
              <FaHeart /> <span>{likeCount}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition">
              <FaRegCommentDots /> <span>Comment</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
