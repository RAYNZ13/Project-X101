import React from "react";
import { CommunityList } from "../components/index";
import { motion } from "framer-motion";
const CommunitiesPage = () => {
  return (
    <div className="pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold 
                     text-center bg-gradient-to-t from-purple-500 via-pink-400 to-purple-500 
                     bg-clip-text text-transparent tracking-tight mb-5
        "
      >
        Recent Communities
      </motion.h2>

      {/* Posts */}
      <CommunityList />
    </div>
  );
};

export default CommunitiesPage;
