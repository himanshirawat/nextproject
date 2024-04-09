"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const decodeAuthToken = () => {
      const authToken = Cookies.get("authToken");
      if (authToken) {
        try {
          const decoded = jwtDecode(authToken);
          setUserData(decoded);
        } catch (error) {
          console.error("Error decoding authToken:", error);
        }
      }
    };

    decodeAuthToken();

    return () => {};
  }, []);

  return (
    <UserContext.Provider value={{ userData }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
