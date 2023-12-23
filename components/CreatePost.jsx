"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";

const CreatePost = ({ profileData, setPosts }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const supabase = createClientComponentClient();

  const handleSubmit = async (e) => {
    const { data, error } = await supabase
      .from("posts")
      .insert({
        title,
        content,
        author_username: profileData.username,
        author_avatar_url: profileData.avatar_url,
        author_id: profileData.id,
      })
      .select("*")
      .single();

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
      setPosts((currPosts) =>
        [data, ...currPosts].sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        })
      );
    }

    setTitle("");
    setContent("");
  };

  return (
    <div className="p-4 border border-gray-300 rounded-md">
      <h1 className="font-2xl font-bold text-gray-700 mb-8">
        Welcome, {profileData.full_name}! 👋
      </h1>
      <h2 className="font-bold text-2xl mb-4">Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title" className="block mb-2">
          Title:
          <input
            type="text"
            id="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label htmlFor="content" className="block mb-2">
          Content:
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          ></textarea>
        </label>

        <button type="submit" className="w-full btn-success">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
