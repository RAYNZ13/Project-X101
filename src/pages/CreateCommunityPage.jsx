import { CreateCommunity } from "../components/index";
import { motion } from "framer-motion";
const CreateCommunityPage = () => {
  return (
    <main className="pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold 
                     text-center bg-gradient-to-t from-purple-500 via-pink-400 to-purple-500 
                     bg-clip-text text-transparent tracking-tight mb-5"
        >
          Create Community
        </h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="w-full mt-10"
      >
        <CreateCommunity />
      </motion.div>
    </main>
  );
};

export default CreateCommunityPage;
