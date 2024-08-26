import React from "react";
import LeftSection from "../components/LeftSection";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex min-h-screen">
      <LeftSection />
      <Outlet />
    </div>
  );
};

export default Home;
