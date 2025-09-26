import React from "react";

const PostPageSkeleton = () => {
  return (
    <div className="bg-zinc-950 space-y-6 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 rounded-lg">
      <h2 className="h-10 bg-zinc-900/50 rounded animate-pulse"></h2>

      <div className="w-full overflow-hidden rounded-lg h-72 bg-zinc-900/90 animate-pulse"></div>

      <p className="h-6 bg-zinc-900/50 rounded animate-pulse"></p>

      <p className="h-4 bg-zinc-900/50 rounded w-1/4 animate-pulse"></p>

      <div className="space-y-4">
        <button className="w-full h-10 bg-zinc-900/50 rounded animate-pulse"></button>
        <div className="h-10 bg-zinc-900/50 rounded animate-pulse"></div>
      </div>
    </div>
  );
};

export default PostPageSkeleton;
