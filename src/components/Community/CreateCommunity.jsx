import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { supabase } from "../../backend/Supabase-client";

const createCommunity = async ({ name, description, userId, username }) => {
  if (!userId || !username) {
    throw new Error("You must be logged in to create a community");
  }

  const { data, error } = await supabase
    .from("Communities")
    .insert({ name, description, user_id: userId, created_by: username })
    .select()
    .single();

  if (error) throw new Error(error.message || "Error creating community");

  return data;
};

const CreateCommunity = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Communities"] });
      toast.success("Community created successfully!");
      navigate("/communities");
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      name,
      description,
      userId: user?.id,
      username: user?.user_metadata?.full_name,
    });
    setName("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-2xl mx-auto p-[2px] rounded-xl 
                 bg-gradient-to-r from-pink-500 via-violet-500 to-purple-500  
                 shadow-lg hover:shadow-[0_8px_20px_rgba(236,72,153,0.5),0_8px_40px_rgba(139,92,246,0.4),0_8px_60px_rgba(168,85,247,0.3)] 
                 transition-all duration-300 "
    >
      <div className="w-full h-full p-4 sm:p-6 bg-zinc-950 rounded-lg space-y-6">
        {/* Community Name */}
        <div>
          <label className="block mb-2 text-sm sm:text-base font-medium text-gray-200">
            Community Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-white/20 bg-transparent rounded-md px-3 py-2 sm:py-3 
                       text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 
                       transition duration-200"
            placeholder="Enter the name of your community"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 text-sm sm:text-base font-medium text-gray-200">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            required
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-white/20 bg-transparent rounded-md px-3 py-2 sm:py-3 
                       text-white placeholder-gray-400 resize-y 
                       focus:outline-none focus:ring-2 focus:ring-purple-500 
                       transition duration-200"
            placeholder="Write your description here..."
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     text-white px-6 py-2 rounded-md font-medium 
                     transition-all duration-200"
        >
          {isPending ? "Creating..." : "Create Community"}
        </button>
      </div>
    </form>
  );
};

export default CreateCommunity;
