import { CreatePost } from "../components/index";
import { motion } from "framer-motion";

const CreatePostPage = () => {
  return (
    <main
      className="pt-10 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto min-h-screen"
      aria-label="Create new post page"
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="space-y-4"
      >
        {/* Title */}
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold 
                     text-center bg-gradient-to-t from-purple-500 via-pink-400 to-purple-500 
                     bg-clip-text text-transparent tracking-tight mb-5"
        >
          Create New Post
        </h2>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg text-center max-w-2xl mx-auto">
          Share your thoughts, ideas, or media with the community ✨
        </p>
      </motion.div>
      {/* Form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="w-full mt-8"
      >
        <CreatePost />
      </motion.div>
    </main>
  );
};

export default CreatePostPage;
