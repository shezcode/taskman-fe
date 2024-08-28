import { useContext } from "react";
import { AuthContext } from "./AuthContext"; 
import { useLocalStorage } from "./useLocalStorage";

// NOTE: optimally move this into a separate file
export interface UserLog {
  email: string,
  authToken?: string;
}

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  const addUser = (user: UserLog) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    setItem("user", "");
  };

  return { user, addUser, removeUser, setUser };
};
