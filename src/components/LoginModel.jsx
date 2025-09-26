import { useAuth } from "../context/authContext";
import { motion } from "framer-motion";

function LoginModal() {
  const { isLoginOpen, closeLogin, signInWithGoogle } = useAuth();

  if (!isLoginOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-[90%] max-w-md shadow-xl text-center"
      >
        <h2 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">
          Welcome Back 👋
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Sign in to continue
        </p>

        <button
          onClick={signInWithGoogle}
          className="w-full py-2 px-4 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition"
        >
          Continue with Google
        </button>

        <button
          onClick={closeLogin}
          className="mt-4 text-sm text-gray-400 hover:text-red-400 transition-all"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
}

export default LoginModal;
