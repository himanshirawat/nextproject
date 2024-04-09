"use client";
import { useUser } from "@/utils/UserContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function HomeData() {
  const [data, setData] = useState([]);
  const { userData } = useUser();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user/allusers");
        setData(response.data.allusers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSignOut = () => {
    Cookies.remove("authToken");
    router.push("/login");
  };

  return (
    <div className="p-4 bg-[url('/signimage.jpg')] bg-no-repeat bg-cover h-[100vh] text-white ">
      <div className="flex justify-between font-semibold">
        <div className="w-full">
          {userData && (
            <div className=" flex justify-between ">
              <p>{userData.email}</p>
              <p>{userData.name}</p>
            </div>
          )}
        </div>
        <div className="w-[140px] text-center">
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>

      <div className="w-full h-[80vh] flex flex-col items-center justify-center text-black space-y-4">
        <p>Other Members</p>
        <div className="space-y-4">
          {data.map((value, index) => (
            <div key={index} className="capitalize">
              Users Name: {value.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
