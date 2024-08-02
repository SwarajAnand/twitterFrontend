import { useEffect, useState } from "react";
import apiClient from "../utils/apiClient";
import Post from "./Post";
import CreatePost from "./CreatePost";

const MiddleSection = () => {
  const [page, setpage] = useState(1);
  const [postData, setPostData] = useState([]);
  const [newPost, setNewPost] = useState(null);
  useEffect(() => {
    apiClient.get(`/posts/allPosts?page=${page}&limit=10`).then((res) => {
      setPostData(res.data.posts);
    });
  }, [page, newPost]);

  return (
    <div className="scroll-container">
      <CreatePost setNewPost={setNewPost} />
      <div className="scroll-content">
        {postData.map((ele) => (
          <Post key={ele._id} data={ele} />
        ))}
      </div>

    </div>
  );
};

export default MiddleSection;
