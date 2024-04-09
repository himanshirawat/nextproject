"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignUpForm() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();
  const handleBlur = () => {
    if (credentials.password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    const response = await axios.post(
      "http://localhost:8000/user/createuser",
      credentials
    );

    if (response.status != 200) {
      alert("Enter valid Credentials");
    }
    if (response.status == 200) {
      router.push("/login");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setPasswordError("");
  };

  return (
    <div className="flex  rounded ">
      <div className=" z-10 p-8 bg-white w-[40vw] rounded-lg shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-20">
        <div className="my-6">
          <p className="text-[32px] font-semibold text-white">
            Create <br /> Your Account
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-white font-semibold text-[18px]">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              about="Your Name should have at least 5 letters"
              value={credentials.name}
              onChange={handleChange}
              className="border border-gray-400 rounded bg-slate-200 px-3 py-1 w-[30vw]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white font-semibold text-[18px]">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
              className="border border-gray-400 rounded bg-slate-200 px-3 py-1 w-[30vw]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-white font-semibold text-[18px]">
              Password
            </label>
            <input
              type="text"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border border-gray-400 rounded bg-slate-200 px-3 py-1 w-[30vw]"
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          <div className="w-full ">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 mt-8 rounded-md w-[30vw] "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
