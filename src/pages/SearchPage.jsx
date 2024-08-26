import { useState, useEffect } from "preact/hooks";
import React from "react";
import apiClient from "../utils/apiClient";
import SearchCards from "../components/SearchCards";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const SearchPage = () => {
  const [userName, setUserName] = useState("");
  const [searchData, setSearchData] = useState([]);
  const debouncedUserName = useDebounce(userName, 500);

  useEffect(() => {
    if (debouncedUserName) {
      apiClient.get(`users/search?userName=${debouncedUserName}`)
        .then(response => {
          console.log(response.data.data);
          setSearchData(response.data.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [debouncedUserName]);

  return (
    <div className="min-w-[50%]">
      <div className="flex justify-center items-center">
        <input
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          className="loginPageInput min-w-[80%] pl-6 p-2 rounded-full text-xl text-black outline-none mt-8"
          placeholder="Search User Emails"
        />
      </div>

      <div className="flex justify-center flex-col items-center">
        {
          searchData.map((ele) => {
            return (
              <div key={ele._id} className="min-w-[80%]">
              <SearchCards data={ele}  />
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default SearchPage;
