import React from "react";
import clsx from "clsx";

function PostSkeleton({ className }) {
  return (
    <div className={clsx("block h-full w-full", className)} aria-hidden="true">
      <div className="flex flex-col h-full bg-zinc-800/90 rounded-xl animate-pulse border border-white/10">
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
          <div className="w-[35px] h-[35px] rounded-full bg-zinc-700" />
          <div className="flex flex-col overflow-hidden">
            <div className="w-24 h-4 bg-zinc-700 rounded-md" />
            <div className="w-16 h-3 bg-zinc-700 rounded-md mt-1" />
          </div>
        </div>

        {/* Image */}
        <div className="w-full aspect-video bg-zinc-700" />

        {/* Content */}
        <div className="flex flex-col flex-grow p-2 sm:p-5 space-y-3">
          <div className="w-3/4 h-6 bg-zinc-700 rounded-md" />
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/10">
            <div className="w-16 h-4 bg-zinc-700 rounded-md" />
            <div className="w-16 h-4 bg-zinc-700 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostSkeleton;
