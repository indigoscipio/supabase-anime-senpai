"use client";
import React from "react";
import CreatePost from "./CreatePost";
import PostLists from "./PostLists";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import EditPostPopup from "./EditPostPopup";
import Loader from "./Loader";

const MainDashboard = ({ user, profileData }) => {
  const [posts, setPosts] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [openEditPostPopup, setOpenEditPostPopup] = useState(false);
  const supabase = createClientComponentClient();

  const handleDeletePost = async (id) => {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", id)
      .select()
      .single();
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    }
  };

  const handleOpenEditPostPopup = (post) => {
    setOpenEditPostPopup(true);
    setSelectedPost(post);
  };

  useEffect(() => {
    const fetchAllPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .order("created_at", { ascending: false });
      console.log(data);
      setPosts(data);
    };

    fetchAllPosts();
  }, []);

  if (!posts || !user || !profileData) {
    return <Loader />;
  }

  return (
    <div>
      {openEditPostPopup && (
        <EditPostPopup
          setPosts={setPosts}
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
          setOpenEditPostPopup={setOpenEditPostPopup}
        />
      )}

      <div className="container mx-auto py-8">
        <CreatePost setPosts={setPosts} profileData={profileData} />

        <div className="p-4">
          <h2 className="font-bold text-2xl mb-4">Latest Post</h2>
          {posts.length === 0 ? (
            <p>There are 0 posts...</p>
          ) : (
            <PostLists
              profileData={profileData}
              handleOpenEditPostPopup={handleOpenEditPostPopup}
              posts={posts}
              setPosts={setPosts}
              handleDeletePost={handleDeletePost}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
