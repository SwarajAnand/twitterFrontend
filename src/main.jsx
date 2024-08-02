import { createContext, render, useState, useEffect } from "react";
import { App } from "./app.jsx";
import "./index.css";

export const TwitterContext = createContext();

const TwitterContextProvider = () => {
  const [currUser, setCurrUser] = useState(JSON.parse(localStorage.getItem("twitterDB")) || []);

  useEffect(() => {
    if (currUser) localStorage.setItem("twitterDB", JSON.stringify(currUser));
  }, [currUser])

  console.log(currUser);
  return (
    <TwitterContext.Provider value={{ currUser, setCurrUser }}>
      <App />
    </TwitterContext.Provider>
  );
};

render(<TwitterContextProvider />, document.getElementById("app"));
