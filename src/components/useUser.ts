"use client"
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useLocalStorage } from "./useLocalStorage";

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem, removeItem } = useLocalStorage();

  const addUser = (user: string) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    removeItem("user");
  };

  return { user, addUser, removeUser, setUser };
};
