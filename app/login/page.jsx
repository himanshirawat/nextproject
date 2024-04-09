import LoginForm from "@/components/LoginForm";
import React from "react";

export default function Page() {
  return (
    <div>
      <div className="bg-[url('/side.jpg')] bg-no-repeat bg-cover flex justify-center h-screen overflow-hidden m-auto items-center ">
        <LoginForm />
      </div>
    </div>
  );
}
