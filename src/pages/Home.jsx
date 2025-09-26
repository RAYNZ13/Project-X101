import React, { useCallback, useState } from "react";
import { PostList } from "../components/index";
import { Link } from "react-router-dom";
import { BackgroundBeamsWithCollision } from "../components/ui/background-beams-with-collision";
import { motion } from "framer-motion";
import debounce from "lodash.debounce";

const HeroSection = ({ onSearchChange }) => (
  <section className="relative w-full sm:h-[80vh] min-h-[50vh] sm:flex items-center justify-center overflow-hidden">
    <BackgroundBeamsWithCollision>
      <div className="text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black mb-5 text-center 
            bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight"
        >
          Welcome to Islamic.forum
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mt-2 mb-5 sm:mb-10 text-lg sm:text-xl text-zinc-400"
        >
          A global community for thoughtful discussion and learning.
        </motion.p>
        <div className="flex justify-center mb-10">
          <input
            type="text"
            aria-label="Search posts"
            placeholder="🔍 Search posts..."
            onChange={onSearchChange}
            className="w-full sm:w-1/2 px-3 py-2 sm:px-5 sm:py-3 rounded-full 
              bg-zinc-900 text-gray-200 border border-zinc-700 
              focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
          />
        </div>
        {/* <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/createPost"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium shadow-lg transition-all duration-300"
          >
            Create Post
          </Link>
          <Link
            to="/communities"
            className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-md font-medium shadow-lg transition-all duration-300"
          >
            Explore Communities
          </Link>
        </div> */}
      </div>
    </BackgroundBeamsWithCollision>
  </section>
);

const PostsSection = ({ query, isSearch }) => (
  <section className="mt-5">
    <motion.h2
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 2, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold mb-5 text-center 
        bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
    >
      {isSearch ? `Search Results for "${query}"` : "Recent Posts"}
    </motion.h2>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <PostList searchQuery={query} />
    </motion.div>
  </section>
);

const Home = () => {
  const [query, setQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  // Using a single-line debounce for conciseness
  const debouncedSearch = useCallback(
    debounce((val) => {
      setQuery(val);
      setIsSearch(val.length > 0);
    }, 400),
    []
  );

  const handleChange = (e) => {
    debouncedSearch(e.target.value);
  };

  return (
    <main className="pt-0 sm:pt-0 px-4 sm:px-6 lg:px-7 max-w-screen mx-auto">
      <HeroSection onSearchChange={handleChange} />
      <PostsSection query={query} isSearch={isSearch} />
    </main>
  );
};

export default Home;
