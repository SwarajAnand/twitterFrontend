import React from "react";
import LeftSection from "../components/LeftSection";
import RightSection from "../components/RightSection";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex">
      <LeftSection />
      <Outlet />
      <RightSection />
    </div>
  );
};

export default Home;
