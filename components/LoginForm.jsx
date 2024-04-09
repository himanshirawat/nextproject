"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:8000/user/loginuser",
      credentials
    );

    if (response.status != 200) {
      alert("Enter valid Credentials");
    }
    if (response.status == 200) {
      Cookies.set("authToken", response.data.authToken);
      router.push("/");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className="flex items-center h-fit px-20 py-14 rounded ">
      <div className=" z-10 p-8 bg-white rounded-lg shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-20">
        <div className="my-6">
          <p className="text-[32px] font-semibold text-white">
            Hello ! <br /> Welcome Back
          </p>
        </div>
        <form className=" space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-white font-semibold text-[18px]">
              Email*
            </label>
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="border border-gray-400 rounded bg-slate-200 px-3 py-1 w-[20vw]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white font-semibold text-[18px]">
              Password*
            </label>
            <div className="flex items-center border border-gray-400 rounded bg-slate-200 px-3 py-1 w-[20vw]">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 outline-none focus:outline-none"
              >
                {showPassword ? (
                  <Image
                    src="/eye.svg"
                    width={200}
                    height={200}
                    className="w-6 h-6"
                  />
                ) : (
                  <Image
                    src="/eyeoff.svg"
                    width={200}
                    height={200}
                    className="w-6 h-6"
                  />
                )}
              </button>
            </div>
          </div>
          <div className="text-center ">
            <button
              type="submit"
              className="bg-green-400 w-full px-3 py-2 text-white font-semibold rounded-md"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-[14px] text-center">
          New User?
          <Link href={"/signup"} className="text-blue-700 underline">
            {" "}
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
}
