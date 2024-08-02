import { useNavigate } from "react-router-dom";
import xIcon from "../assets/icons8-twitterx-500.svg";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "../utils/common";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if(token) {
      navigate("/allPosts");
    }

  }, []);

  const handleSignUp = () => {
    if (!data.userName?.trim() || !data.email?.trim() || !data.password) {
      toast("All fields are required");
      return;
    }

    setLoading(true);
    console.log(data);

    axios
      .post(`${BASE_URL}users/signup`, data)
      .then((res) => {
        console.log(res.data.message);
        toast(res.data.message);
        setData({
          userName: "",
          email: "",
          password: "",
        });
        navigate("/");
      })
      .catch((err) => {
        toast(err.message);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="md:flex justify-evenly items-center h-screen overflow-hidden">
      <div className="h-full w-full flex justify-center items-center hidden md:block md:mt-[30%] lg:mt-[10%]">
        <div className="bg-white lg:h-[500px] lg:w-[500px] md:h-[400px] md:w-[400px]  bg-cover overflow-hidden">
          <img
            src={xIcon}
            alt="xIcon"
            className="bg-white h-full bg-cover scale-150"
          />
        </div>
      </div>
      <div className="flex flex-col  gap-4 text-xl w-[90%] m-auto md:w-[full] mt-10 md:mt-0">
        <h1 className="lg:text-7xl text-5xl font-black md:my-10 ">
          Happening now
        </h1>
        <p className="text-2xl md:text-4xl font-black">Create account</p>

        <input
          type="text"
          placeholder="Email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className="loginPageInput md:w-[80%] lg:w-[40%] w-full p-2 rounded-full outline-none text-black"
        />

        <input
          type="text"
          placeholder="Username"
          value={data.username}
          onChange={(e) => setData({ ...data, userName: e.target.value })}
          className="loginPageInput md:w-[80%] lg:w-[40%] p-2 rounded-full outline-none text-black"
        />

        <input
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          className="loginPageInput md:w-[80%] lg:w-[40%] p-2 rounded-full outline-none text-black"
        />

        <button
          className="md:w-[80%] lg:w-[40%] p-2 rounded-full bg-[#1d9bf0] font-semibold"
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? <span className="loader"></span> : <span>SignUp</span>}
        </button>

        <p className="md:w-[80%] lg:w-[40%] text-center my-1 text-sm">OR</p>
        <button
          className="md:w-[80%] lg:w-[40%] p-2 rounded-full bg-[#1d9bf0] font-semibold"
          onClick={() => navigate("/")}
          disabled={loading}
        >
          Login
        </button>
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

export default SignUp;
