import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenuOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { useAuth } from "../context/authContext";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut, openLogin } = useAuth();

  const displayName = user?.user_metadata?.full_name || user?.email;

  // Common nav links
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/allPosts", label: "All Posts" },
    { to: "/createPost", label: "Create Post" },
    { to: "/communities", label: "Communities" },
    { to: "/communities/create", label: "Create Community" },
  ];

  // Authentication buttons
  const AuthButtons = ({ mobile = false }) => {
    if (user) {
      return (
        <div
          className={`flex ${
            mobile
              ? "flex-col items-center space-y-2"
              : "items-center space-x-3"
          }`}
        >
          <span className="font-medium text-white">{displayName}</span>
          <button
            onClick={() => {
              signOut();
              if (mobile) setMenuOpen(false);
            }}
            className={`${
              mobile ? "w-1/2" : "px-3 py-2"
            } rounded-full bg-transparent border-2 border-red-500 text-white font-semibold hover:bg-red-600 hover:border-red-600 transition-colors`}
          >
            Sign Out
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={() => {
          openLogin();
          if (mobile) setMenuOpen(false);
        }}
        className={`${
          mobile ? "w-1/2" : "px-4 py-2"
        } rounded-full bg-transparent border border-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors`}
      >
        Sign In
      </button>
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-zinc-950/80 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl md:max-w-5xl lg:max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="font-sans text-lg sm:text-xl lg:text-2xl font-extrabold text-white whitespace-nowrap"
          >
            Islamic
            <span className="bg-gradient-to-l from-purple-500 to-pink-500 bg-clip-text text-transparent">
              .forum
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-zinc-300 hover:text-white hover:font-semibold transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Authentication */}
          <div className="hidden lg:flex items-center space-x-4">
            <AuthButtons />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-b from-purple-500 to-pink-500 text-white hover:scale-110 transition-transform duration-300"
            >
              {menuOpen ? <MdClose size={20} /> : <IoMenuOutline size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out bg-zinc-900/90 backdrop-blur-lg border-b border-white/10 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-center px-2 pt-2 pb-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-zinc-800 transition-all duration-150"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Authentication */}
          <div className="mt-4">
            <AuthButtons mobile />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
