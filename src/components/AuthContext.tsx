"use client"
import { createContext } from "react";

interface AuthContext {
  realUser: string | null;
  setUser: (user: string| null) => void;
}

export const AuthContext = createContext<AuthContext>({
  realUser: null,
  setUser: () => {},
});
