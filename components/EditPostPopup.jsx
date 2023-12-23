import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

const EditPostPopup = ({
  setOpenEditPostPopup,
  selectedPost,
  setSelectedPost,
  setPosts,
}) => {
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const supabase = createClientComponentClient();
  console.log("editing post... ", selectedPost);

  const setHandleClosePopUp = () => {
    setOpenEditPostPopup(false);
    setSelectedPost(null);
  };

  const handleEditPost = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("posts")
      .update({ title: editedTitle, content: editedContent })
      .eq("id", selectedPost.id)
      .select()
      .single();

    if (error) {
      console.log(error);
      setErrorMsg(error.message);
    }

    if (data) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === selectedPost.id ? { ...post, ...data } : post
        )
      );
      setSuccessMsg("Post successfully updated!");
    }
  };

  return (
    <div className="popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="popup-content bg-white p-8 rounded-md shadow-md">
        <form onSubmit={handleEditPost} className="text-center">
          <h1 className="text-2xl font-bold mb-6">Edit Post</h1>

          <div className="mb-4">
            <label htmlFor="editedTitle" className="block mb-2">
              Post Title:
              <input
                type="text"
                id="editedTitle"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                placeholder="Edit your post title..."
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            </label>
          </div>

          <div className="mb-4">
            <label htmlFor="editedContent" className="block mb-2">
              Post Content:
              <textarea
                id="editedContent"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                placeholder="Edit your post content...."
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                cols="30"
                rows="10"
              ></textarea>
            </label>
          </div>

          <button type="submit" className="w-full btn-primary mb-2">
            Update
          </button>

          <button
            type="button"
            onClick={() => setHandleClosePopUp()}
            className="w-full btn-danger"
          >
            Close ❌
          </button>

          {errorMsg && (
            <p className="font-bold text-red-500">ERROR: {errorMsg}</p>
          )}
          {successMsg && (
            <p className="font-bold text-green-500">
              Post successfully updated
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditPostPopup;
