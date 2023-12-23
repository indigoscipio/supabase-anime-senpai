"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import EditPostPopup from "./EditPostPopup";
import Loader from "./Loader";

const UserProfile = ({ authUserData }) => {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedFullName, setEditedFullName] = useState("");
  const [editedUsername, setEditedUsername] = useState("");
  const [editedWebsite, setEditedWebsite] = useState("");
  const [editedAvatarURL, setEditedAvatarURL] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [openEditPostPopup, setOpenEditPostPopup] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const supabase = createClientComponentClient();

  const fetchUserData = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select()
      .eq("id", authUserData.id)
      .single();

    if (error) {
      console.log(error);
    }

    if (data) {
      setUser(data);
      const { data: userPosts, error: userPostsError } = await supabase
        .from("posts")
        .select()
        .eq("author_id", data.id)
        .order("created_at", { ascending: false });

      if (userPosts) {
        console.log(userPosts);
        setUserPosts(userPosts);
      }
    }
  };

  const handleOpenEditPostPopup = (post) => {
    setOpenEditPostPopup(true);
    setSelectedPost(post);
  };

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
      setUserPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    }
  };

  const handleProfileEdit = async (e) => {
    e.preventDefault();
    console.log("editing profile...");

    const { data, error } = await supabase
      .from("profiles")
      .update({
        username: editedUsername || user.username,
        full_name: editedFullName || user.full_name,
        website: editedWebsite || user.website,
        avatar_url: editedAvatarURL || user.avatar_url,
      })
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      console.log(error);
      setErrorMsg(error);
    }

    if (data) {
      console.log(data);
      fetchUserData();

      setIsEditingProfile(false);
      setEditedFullName("");
      setEditedUsername("");
      setEditedWebsite("");
      setEditedAvatarURL("");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!user || !userPosts) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto py-16">
      <div className="p-4 bg-neutral-100">
        <h2 className="font-bold text-2xl mb-4">User Profile</h2>

        {isEditingProfile ? (
          <form className="mb-4" onSubmit={handleProfileEdit}>
            <label htmlFor="full_name" className="block mb-2">
              Full Name:
              <input
                type="text"
                id="full_name"
                value={editedFullName}
                onChange={(e) => setEditedFullName(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </label>

            <label htmlFor="username" className="block mb-2">
              Username:
              <input
                type="text"
                id="username"
                value={editedUsername}
                onChange={(e) => setEditedUsername(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </label>

            <label htmlFor="website" className="block mb-2">
              Website:
              <input
                type="text"
                id="website"
                value={editedWebsite}
                onChange={(e) => setEditedWebsite(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </label>

            <label htmlFor="avatar_url" className="block mb-2">
              Avatar URL:
              <input
                type="text"
                id="avatar_url"
                value={editedAvatarURL}
                onChange={(e) => setEditedAvatarURL(e.target.value)}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </label>

            <button type="submit" className="w-full btn-success">
              Save
            </button>

            {errorMsg && (
              <p className="font-bold text-red-500 mt-2">
                ERROR: {errorMsg.message}
              </p>
            )}
          </form>
        ) : (
          <div className="mb-4">
            <p className="mb-2">Full Name: {user?.full_name}</p>
            <p className="mb-2">Username: {user?.username}</p>
            <p className="mb-2">Website: {user?.website}</p>
            <img
              src={user?.avatar_url}
              width="48"
              height="48"
              alt=""
              className="rounded-full"
            />
          </div>
        )}

        <button
          onClick={() => setIsEditingProfile(!isEditingProfile)}
          className={isEditingProfile ? "btn-danger" : "btn-success"}
        >
          {isEditingProfile ? "Cancel Editing ❌" : "Edit Profile 🖊"}
        </button>
      </div>

      <div className="mt-8">
        <h2 className="font-bold text-2xl mb-4">My Anime Posts</h2>
        {userPosts?.map((userPost) => (
          <div key={userPost.id} className="mb-4 p-4 bg-neutral-100 rounded-xl">
            <h2 className="font-bold text-xl mb-2">{userPost.title}</h2>
            <p className="mb-2">{userPost.content}</p>
            <p className="mb-2">Posted at {userPost.created_at}</p>
            <button
              onClick={() => handleOpenEditPostPopup(userPost)}
              className="btn-primary mr-2"
            >
              Edit Post
            </button>
            <button
              onClick={() => handleDeletePost(userPost.id)}
              className="btn-danger"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {openEditPostPopup && (
        <EditPostPopup
          setPosts={setUserPosts}
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
          setOpenEditPostPopup={setOpenEditPostPopup}
        />
      )}
    </div>
  );
};

export default UserProfile;
