import { useContext } from "preact/hooks";
import { useNavigate } from "react-router-dom";
import { TwitterContext } from "../main";
import apiClient from "../utils/apiClient";
import { BASE_URL } from "../utils/common";
import Cookies from "js-cookie";

const LeftSection = () => {
  const { currUser } = useContext(TwitterContext);
  const loggedInUser = currUser?.userId;
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate(`/getProfile/${loggedInUser}`);
  }

  

  const handleLogout = async () => {
    try {
      apiClient.get(`/users/logout`)
      .then((res) => {
        console.log(res);
        Cookies.remove("token");
      navigate("/" , {replace: true});
      })
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-[24%] pl-10 p-2 flex flex-col justify-around max-h-screen sticky">
      <i className="fa-brands fa-x-twitter fa-2xl ml-5"></i>
      <div className="flex flex-col justify-around gap-8">
        <div className="flex items-center justify-center gap-6 max-w-[150px] h-[40px] cursor-pointer hover:bg-[#1DA1F2] rounded-full">
          <i className="fa-solid fa-house fa-xl" style="color: #ffffff;"></i>
          <span className="text-xl">Home</span>
        </div>

        <div className="flex items-center justify-center gap-6 max-w-[150px] h-[40px] cursor-pointer hover:bg-[#1DA1F2] rounded-full">
          <i
            className="fa-solid fa-magnifying-glass fa-xl"
            style="color: #fafafa;"
          ></i>
          <span className="text-xl">Explore</span>
        </div>

        <div className="flex items-center justify-center gap-6 max-w-[150px] h-[40px] cursor-pointer hover:bg-[#1DA1F2] rounded-full"
        onClick={goToProfile}>
          <i className="fa-regular fa-user fa-xl" style="color: #ffffff;"></i>
          <span className="text-xl">Profile</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 max-w-[150px] h-[40px] cursor-pointer hover:bg-[#1DA1F2] rounded-full"
      onClick={handleLogout}>
        <i
          className="fa-solid fa-arrow-right-from-bracket fa-2xl"
          style="color: #ffffff;"
        ></i>
        <span className="text-xl">Log Out</span>
      </div>
    </div>
  );
};

export default LeftSection;
