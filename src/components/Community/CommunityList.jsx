import React from "react";
import { supabase } from "../../backend/Supabase-client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { CommunitySkeleton } from "../skeleton/index";
import { motion } from "framer-motion";
const fetchCommunities = async () => {
  const { data, error } = await supabase
    .from("Communities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Error fetching communities");
  }

  return data;
};

const CommunityList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["Communities"],
    queryFn: fetchCommunities,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <CommunitySkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 mt-10">
        <p className="font-semibold text-lg">Error fetching communities</p>
        <p className="text-sm mt-1">{error.message}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="max-w-5xl mx-auto space-y-6 p-2 sm:p-4"
    >
      {data?.map((community, index) => (
        <div
          key={community.id}
          className="relative w-full p-[2px] rounded-xl 
                     bg-gradient-to-r from-pink-500 via-violet-500 to-purple-500 
                     transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_20px_rgba(175,101,207,0.4)] 
                     "
        >
          <div className="w-full h-full p-4 sm:p-6 bg-zinc-950 rounded-lg">
            <Link to={`community/${community.id}`}>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-200 hover:text-purple-400 transition-colors duration-100">
                {community.name}
              </h2>
            </Link>
            <p className="text-sm sm:text-base text-violet-300 mt-2 line-clamp-3">
              {community.description}
            </p>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default CommunityList;
