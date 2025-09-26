import React, { useState, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "../../backend/Supabase-client";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authContext";
import { Editor } from "@tinymce/tinymce-react";
import config from "../../config";

const slugify = (text) => {
  return text
    .toString()
    .normalize("NFD") // normalize accents
    .replace(/[\u0300-\u036f]/g, "") // remove diacritics
    .replace(/[^a-zA-Z0-9-_]/g, "-") // replace invalid chars
    .replace(/-+/g, "-") // collapse multiple -
    .replace(/^-|-$/g, "") // trim leading/trailing -
    .toLowerCase();
};

const createPost = async ({ post, imageFile }) => {
  const safeTitle = slugify(post.title);
  const safeFileName = slugify(imageFile.name);

  const filePath = `${safeTitle}-${Date.now()}-${safeFileName}`;

  const { error: uploadError } = await supabase.storage
    .from("post-images")
    .upload(filePath, imageFile);

  if (uploadError) throw new Error(uploadError.message);

  const { data: publicUrlData } = supabase.storage
    .from("post-images")
    .getPublicUrl(filePath);

  const { data, error: insertError } = await supabase.from("posts").insert({
    ...post,
    image_url: publicUrlData.publicUrl,
    avatar_url: post.avatar_url,
  });

  if (insertError) throw new Error(insertError.message);

  return data;
};

const fetchCommunities = async () => {
  const { data, error } = await supabase
    .from("Communities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error("Error fetching communities");
  return data;
};

function CreatePost() {
  const [selectedCommunity, setSelectedCommunity] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const { user } = useAuth();

  const { data: communities } = useQuery({
    queryKey: ["Communities"],
    queryFn: fetchCommunities,
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ post, imageFile }) => createPost({ post, imageFile }),
    onSuccess: () => {
      toast.success("Post created successfully!");
      setTitle("");
      setContent("");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    onError: (error) => {
      toast.error(`Error creating post: ${error.message}`);
      console.log(error.message);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedFile) {
      toast.error("Please upload an image before submitting");
      return;
    }
    mutate({
      post: {
        title,
        content,
        author: user?.user_metadata.full_name,
        avatar_url:
          user?.user_metadata.avatar_url || user?.user_metadata.picture || null,
        community_id: selectedCommunity,
      },
      imageFile: selectedFile,
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleCommunityChange = (e) => {
    const value = e.target.value;
    setSelectedCommunity(value ? Number(value) : null);
  };

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative w-full max-w-3xl mx-auto p-[2px] rounded-2xl 
                 bg-gradient-to-r from-pink-500 via-violet-500 to-purple-500 
                 shadow-xl hover:shadow-[0_8px_25px_rgba(236,72,153,0.4),0_12px_40px_rgba(139,92,246,0.4)] 
                 transition-all duration-300"
    >
      <div className="w-full h-full p-6 sm:p-8 bg-zinc-950 rounded-2xl space-y-8">
        {/* Title */}
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm sm:text-base font-semibold text-gray-200"
          >
            Post Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            required
            onChange={(event) => setTitle(event.target.value)}
            className="w-full border border-zinc-700 bg-transparent rounded-lg px-3 py-3 
                       text-white placeholder-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter post title..."
          />
        </div>

        {/* Upload & Community Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Upload Image */}
          <div className="space-y-2">
            <label
              htmlFor="image"
              className="block text-sm sm:text-base font-semibold text-gray-200"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              ref={fileInputRef}
              required
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-200
                         file:mr-4 file:py-2 file:px-4 
                         file:rounded-lg file:border-0 
                         file:text-sm file:font-semibold
                         file:bg-purple-600 file:text-white 
                         hover:file:bg-purple-700
                         cursor-pointer border border-zinc-700 rounded-lg 
                         bg-zinc-950 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Select Community */}
          <div className="space-y-2">
            <label
              htmlFor="community"
              className="block text-sm sm:text-base font-semibold text-gray-200"
            >
              Select Community
            </label>
            <select
              id="community"
              className="block w-full px-4 py-3 text-sm sm:text-base 
                         text-gray-200 bg-zinc-950 border border-zinc-700 rounded-lg 
                         focus:ring-2 focus:ring-purple-500 focus:outline-none
                         hover:border-purple-500 transition"
              onChange={handleCommunityChange}
            >
              <option value="">-- Choose a community --</option>
              {communities?.map((community) => (
                <option key={community.id} value={community.id}>
                  {community.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <label
            htmlFor="content"
            className="block text-sm sm:text-base font-semibold text-gray-200"
          >
            Content
          </label>
          <Editor
            apiKey={config.tinyMceApiKey}
            value={content}
            onEditorChange={handleEditorChange}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                 alignleft aligncenter alignright alignjustify | \
                 bullist numlist outdent indent | removeformat | help",
              skin: "oxide-dark",
              content_css: "dark",
              content_style:
                "body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:14px; color:white; }",
            }}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-purple-600 hover:bg-purple-700 
                       disabled:opacity-50 disabled:cursor-not-allowed
                       text-white px-6 py-3 rounded-lg font-semibold 
                       shadow-md transition-all duration-200"
          >
            {isLoading ? "Creating..." : "Create Post"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreatePost;
