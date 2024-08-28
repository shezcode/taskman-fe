"use client"
import { createContext } from "react";
import { UserLog } from "./useUser";

interface AuthContext {
  user: UserLog | null;
  setUser: (user: UserLog | null) => void;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  setUser: () => {},
});
