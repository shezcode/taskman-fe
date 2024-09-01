"use client"
import { useEffect, useState } from "react";
import { useUser } from "./useUser";
import { useLocalStorage } from "./useLocalStorage";

export const useAuth = () => {
  // we can re export the user methods or object from this hook
  const { user, addUser, removeUser, setUser } = useUser();
  const { getItem } = useLocalStorage();

  const [realUser, setRealUser] = useState("");

  useEffect(() => {
    const userData = getItem("user");
    let finalUser: {email: string};
    if (userData){
      setRealUser(userData.replace(/"/g, "").trim());
    } else {
      finalUser = {email: "nadie@taskMan.com"}
    }
  }, [getItem, addUser, user, setUser])


  const login = (user: string) => {
    addUser(user);
  };

  const logout = () => {
    removeUser();
  };

  return { user, login, logout, setUser, realUser };
};
