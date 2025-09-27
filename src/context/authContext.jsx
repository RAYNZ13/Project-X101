import { createContext, useContext, useEffect, useState, useRef } from "react";
import { supabase } from "../backend/Supabase-client";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Keep track of previous user to detect *real* login/logout
  const prevUserRef = useRef(null);

  useEffect(() => {
    const initSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
      prevUserRef.current = session?.user ?? null; // store initial user
      setLoading(false);
    };

    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const currentUser = session?.user ?? null;

        // Check transitions
        if (!prevUserRef.current && currentUser) {
          // User was null, now logged in
          toast.success("Signed in successfully!");
          setIsLoginOpen(false);
        } else if (prevUserRef.current && !currentUser) {
          // User was logged in, now logged out
          toast.success("Signed out successfully!");
        }

        setUser(currentUser);
        prevUserRef.current = currentUser; // update last known user
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // 🔹 Google Sign-in
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) throw error;
    } catch (err) {
      console.error("Google sign-in error:", err);
      toast.error("Failed to sign in with Google");
    }
  };

  // 🔹 Sign-out
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Sign-out error:", err);
      toast.error("Failed to sign out");
    }
  };

  // 🔹 Modal controls
  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoginOpen,
        openLogin,
        closeLogin,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
