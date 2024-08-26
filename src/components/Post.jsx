import { useContext, useEffect, useState } from "preact/hooks";
import { TwitterContext } from "../main";
import { BASE_URL } from "../utils/common";
import apiClient from "../utils/apiClient";
import { useNavigate } from "react-router-dom";

const Post = ({ data, userAvatar }) => {
  const { currUser } = useContext(TwitterContext);
  const loggedInUser = currUser?.userId;
  const { createdAt, description, _id, user, likeCount, likes } = data;
  const [postliked, setPostliked] = useState(false);
  const [likeCountState, setLikeCountState] = useState(likeCount);
  const navigate = useNavigate();

  useEffect(() => {
    for (let i = 0; i < likes.length; i++) {
      if (likes[i] === loggedInUser) {
        setPostliked(true);
        break;
      }
    }
  }, []);

  const handleLike = () => {
    if (postliked) {
        apiClient
        .post(`${BASE_URL}posts/unlikePost`, { postId: _id })
        .then((res) => {
            console.log(res);
            setPostliked(false);
            setLikeCountState(likeCountState - 1);
        });
    }else{
        apiClient
        .post(`${BASE_URL}posts/likePost`, { postId: _id })
        .then((res) => {
            console.log(res);
            setPostliked(true);
            setLikeCountState(likeCountState + 1);
        });
    }
  }

  const goToProfile = () => {
    navigate(`/getProfile/${data?.user?._id}`);
  }

  return (
    <div className="flex gap-2 border border-gray-800 w-full">
      <div className="min-w-fit mx-2 p-4">
        {(user?.avatar || userAvatar) && (
          <img
            src={user?.avatar || userAvatar}
            alt="avatar"
            className="w-[40px] h-[40px] rounded-full object-cover"
          />
        )}
      </div>
      <div className="w-full">
        <div className="flex gap-6 mb-2 cursor-pointer w-full" onClick={goToProfile}>
          <p className="font-bold">{user.userName}</p>
          <p className="font-thin text-sm text-gray-200">@{user.userName}</p>
          <p className="font-thin text-sm text-gray-300">
            {createdAt.slice(0, 10)}
          </p>
        </div>

        

        <p className="my-4 overflow-hidden">{description}</p>
        {data?.image && (
          <img
            src={data?.image}
            loading="lazy"
            alt="post"
            className="max-w-[500px] max-h-[500px] rounded-md"
          />
        )}

        <div className="flex gap-8 my-2 ">
          <button className="text-blue-500">Reply</button>
          <button className="text-blue-500">Retweet</button>
          <button className="flex gap-1" onClick={handleLike}>
          {
            postliked ? <i className="fa-sharp fa-solid fa-heart text-[red] text-xl"></i> : <i className="fa-sharp fa-regular fa-heart text-[red] text-xl font-thin"></i>
          }
            
            {likeCountState}
          </button>
          <button className="text-blue-500">Share</button>
        </div>
      </div>
    </div>
  );
};

export default Post;
