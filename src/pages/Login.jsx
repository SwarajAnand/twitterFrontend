import { useNavigate } from "react-router-dom";
import xIcon from "../assets/icons8-twitterx-500.svg";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "../utils/common";
import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { TwitterContext } from "../main";

const Login = () => {
  const { currUser, setCurrUser } = useContext(TwitterContext);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if(token) {
      navigate("/allPosts");
    }

  }, []);

  const handleLogin = () => {
    if (!data.email?.trim() || !data.password) {
      toast("All fields are required");
      return;
    }

    setLoading(true);

    axios
      .post(`${BASE_URL}users/login`, data)
      .then((res) => {
        console.log(res);
        setCurrUser(res.data);
        toast(res.data.mesage);
        setData({
          email: "",
          password: "",
        });

        Cookies.set("token", res.data.token, { expires: 1 });
        navigate("/allPosts");
      })
      .catch((err) => {
        console.log(err);
        // toast("Something went wrong");
        toast("Check your credentials");
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
      <div className="flex flex-col gap-4 text-xl w-[90%] m-auto md:w-[full] mt-10 md:mt-0">
        <h1 className="lg:text-7xl text-5xl font-black md:my-10 ">
          Happening now
        </h1>
        <p className="text-2xl md:text-4xl font-black">Login User</p>

        <input
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          type="text"
          placeholder="Email"
          className="loginPageInput md:w-[80%] lg:w-[40%] w-full p-2 rounded-full outline-none text-black"
        />

        <input
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          type="password"
          placeholder="Password"
          className="loginPageInput md:w-[80%] lg:w-[40%] p-2 rounded-full outline-none text-black"
        />

        <button
          className="md:w-[80%] lg:w-[40%] p-2 rounded-full bg-[#1d9bf0] font-semibold"
          disabled={loading}
          onClick={handleLogin}
        >
          {loading ? <span className="loader"></span> : <span>Login</span>}
        </button>

        <p className="md:w-[80%] lg:w-[40%] text-center my-1 text-sm">OR</p>
        <button
          disabled={loading}
          className="md:w-[80%] lg:w-[40%] p-2 rounded-full bg-[#1d9bf0] font-semibold"
          onClick={() => navigate("/signup")}
        >
          SignUp
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

export default Login;
