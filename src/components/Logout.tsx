"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useAuth } from "./useAuth";


export const Logout = () => {

  const {logout} = useAuth();

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login')
  }

  return (
    <Button onClick={handleLogout} variant={"link"}>Logout</Button>
  );
}
