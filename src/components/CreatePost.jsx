import { useContext, useEffect, useRef, useState } from "preact/hooks";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { TwitterContext } from "../main";
import apiClient from "../utils/apiClient";

const CreatePost = ({setNewPost}) => {
  const { currUser } = useContext(TwitterContext);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const currRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    currRef.current.focus();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewSrc(objectUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("description", content);
    if (file) {
      formData.append("avatar", file);
    }

    try {
      const response = await apiClient.post("/posts/createPost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
      toast(response.data.message);
      setContent("");
      setFile(null);
      setPreviewSrc(null);
      setNewPost((prev) => {
        return !prev;
      })
    } catch (error) {
      setMessage("Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 border border-gray-800 py-4">
      <div className="min-w-fit mx-2 p-2">
        <img
          src={currUser?.avatar}
          alt="profile"
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
      </div>
      <div className="w-full">
        <form className="w-full" onSubmit={handleSubmit}>
          <input
            ref={currRef}
            type="text"
            placeholder="What's happening?!"
            className="w-full bg-transparent h-[70px] outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <p className="border-b border-gray-800 py-2 text-[#1DA1F2]">
            Everyone can reply
          </p>

          <div className="flex justify-between items-center">
            <div>
              <input
                type="file"
                id="fileInput"
                className="file-input"
                onChange={handleFileChange}
              />
              <label htmlFor="fileInput" className="file-input-label">
                <i className="fa-regular fa-image"></i>
              </label>
            </div>
            <button
              type="submit"
              className="w-[150px] h-[40px] bg-[#1DA1F2] text-white font-bold rounded-full"
            >
              {loading ? <span className="loader"></span> : <span>POST</span>}
            </button>
          </div>
        </form>
        {previewSrc && (
        <div>
          <img src={previewSrc} alt="Preview" className="max-h-[200px]"/>
        </div>
      )}
        {message && <p>{message}</p>}
      </div>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #1d9bf0",
            padding: "10px 30px",
            fontSize: "16px",
            fontWeight: "500",
            borderRadius: "50px",
            background: "#1d9bf0",
            color: "white",
          },
        }}
      />
    </div>
  );
};

export default CreatePost;
