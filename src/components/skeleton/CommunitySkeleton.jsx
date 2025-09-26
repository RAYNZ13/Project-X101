import React from "react";

const CommunitySkeleton = () => {
  return (
    <div className="bg-zinc-950 max-w-5xl mx-auto space-y-6 p-2 sm:p-4">
      <div
        className="relative w-full p-[2px] rounded-xl bg-zinc-900/80
       animate-pulse"
      >
        <div
          className="w-full h-full p-4 sm:p-6 bg-zinc-900/30
         rounded-lg"
        >
          <h2
            className="w-3/4 h-6 bg-zinc-800
           rounded animate-pulse"
          ></h2>
          <p
            className="w-5/6 h-4 bg-zinc-800
           rounded mt-2 animate-pulse"
          ></p>
          <p
            className="w-5/6 h-4 bg-zinc-800
           rounded mt-2 animate-pulse"
          ></p>
          <p
            className="w-5/6 h-4 bg-zinc-800
           rounded mt-2 animate-pulse"
          ></p>
        </div>
      </div>
    </div>
  );
};

export default CommunitySkeleton;
