import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import {
  Home,
  CreatePostPage,
  PostPage,
  CreateCommunityPage,
  CommunitiesPage,
  CommunityPage,
  AllPostsPage,
} from "./pages/index";
import { NavBar, LoginModal } from "./components/index";

function App() {
  return (
    <>
      <div className="min-h-screen bg-zinc-950 text-zinc-300 transition-opacity duration-700 pt-20">
        <NavBar />
        <LoginModal /> {/* 🔥 added here */}
        <div className="container mx-auto px-4 py-3 ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allPosts" element={<AllPostsPage />} />
            <Route path="/createPost" element={<CreatePostPage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route
              path="/communities/create"
              element={<CreateCommunityPage />}
            />
            <Route path="/communities" element={<CommunitiesPage />} />
            <Route
              path="/communities/community/:id"
              element={<CommunityPage />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
