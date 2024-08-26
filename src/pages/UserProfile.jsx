import { useEffect, useState, useContext } from "preact/hooks";
import { useParams } from "react-router-dom";
import apiClient from "../utils/apiClient";
import Post from "../components/Post";
import Modal from "../components/Modal";
import UserProfileForm from "../components/UserProfileForm";
import { TwitterContext } from "../main";
import { BASE_URL } from "../utils/common";

const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const { currUser } = useContext(TwitterContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageRefresh, setPageRefresh] = useState(false);

  

  useEffect(() => {
    if (id) {
      apiClient
        .get(`/users/getProfile?id=${id}`)
        .then((res) => {
          console.log(res.data.data.user);
          setUserData(res.data.data.user);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => setLoading(false));
    }
  }, [id, pageRefresh]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFollow = () => {
    apiClient
      .get(`${BASE_URL}users/follow?id=${id}`)
      .then((res) => {
        console.log(res.data);
        setPageRefresh(!pageRefresh);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUnfollow = () => {
    apiClient
      .get(`${BASE_URL}users/unFollow?id=${id}`)
      .then((res) => {
        console.log(res.data);
        setPageRefresh(!pageRefresh);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="w-[48%] border border-gray-800 min-h-screen mt-[50px] relative">
      {currUser?.userId === id && !loading &&(
        <i
          className="fa-solid fa-gear fa-xl absolute top-[22px] right-3 cursor-pointer"
          style="color: #1DA1F2;"
          onClick={handleModalOpen}
        ></i>
      )}

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <UserProfileForm userData={userData} onClose={handleModalClose} setPageRefresh={setPageRefresh}/>
      </Modal>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
        <span className="loader"></span>
        </div> 
      ) : (
        <div>
          <div className="flex justify-around p-4 items-center">
            <img
              src={userData?.avatar}
              className="w-[150px] h-[150px] rounded-full object-cover "
            />
            {currUser?.userId === id ? (
              <button disabled className="w-[150px] h-[40px] bg-[#1DA1F2]">
                {" "}
                {userData.followers.length} Followers
              </button>
            ) : (
              <div>
              {
                userData.followers.includes(currUser?.userId) ? (
                  <button className="w-[150px] h-[40px] bg-[#1DA1F2]" onClick={handleUnfollow}>
                    Unfollow
                  </button>
                ) : (
                  <button className="w-[150px] h-[40px] bg-[#1DA1F2]" onClick={handleFollow}>
                    Follow
                  </button>
                )
              }
              </div>
            )}
          </div>

          <div className="flex justify-around p-4">
            <p>Joined ❤️ {userData?.createdAt.slice(0, 10)}</p>
            <p>{userData?.email}</p>
            <p>Username - {userData?.userName}</p>
            <p>{userData.followers.length} Followers</p>
          </div>

          <div className="text-center px-2 py-4">
            <p className="">{userData?.bio}</p>
          </div>

          <div>
            {userData?.posts?.map((ele) => {
              return <Post key={ele._id} data={ele} userAvatar={userData?.avatar}/>;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
