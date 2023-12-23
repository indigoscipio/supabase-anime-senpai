"use client";
import React from "react";

const PostLists = ({
  posts,
  handleDeletePost,
  handleOpenEditPostPopup,
  profileData,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {posts?.map((post) => (
        <div key={post.id} className="p-4 bg-white shadow-md rounded-lg">
          <div className="flex items-center gap-2">
            <img
              className="rounded-full h-10 w-10"
              src={post.author_avatar_url}
              alt=""
            />
            <p className="font-bold">{post.author_username}</p>
          </div>
          <h2 className="text-lg font-semibold my-2">{post.title}</h2>
          <p className="text-gray-700">{post.content}</p>
          <p className="text-sm text-gray-500 mt-2">
            Posted on {post.created_at}
          </p>

          {profileData.id === post.author_id && (
            <div className="flex justify-end mt-2">
              <button
                onClick={() => handleDeletePost(post.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
              <button
                onClick={() => handleOpenEditPostPopup(post)}
                className="ml-2 text-blue-500 hover:underline"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostLists;
