import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../backend/Supabase-client";
import toast from "react-hot-toast";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    let initialLoad = true;

    const initSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);

        // ✅ Only toast for actual login/logout, not restore
        if (event === "SIGNED_IN" && !initialLoad) {
          toast.success("Signed in successfully!");
          setIsLoginOpen(false);
        }

        if (event === "SIGNED_OUT") {
          toast.success("Signed out successfully!");
        }
      }
    );

    initialLoad = false;

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

  // 🔹 Sign-out (toast handled by listener)
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
