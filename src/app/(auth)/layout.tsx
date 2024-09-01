"use client"
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "../../app/globals.css"
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { AuthContext } from "@/components/AuthContext";
import { useAuth } from "@/components/useAuth";
import { useContext } from "react";
import NavbarLogin from "@/components/NavbarLogin";
import Login from "../login/page";
import { useLocalStorage } from "@/components/useLocalStorage";
import { useRouter } from "next/navigation";

const fontSans = FontSans({ 
  subsets: ["latin"],
  variable: "--font-sans"
});

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const {realUser, setUser} = useAuth();

  return (
    <div
        className={cn("min-h-screen w-full bg-background font-sans antialiased flex flex-col items-center", fontSans.variable)}>
        <AuthContext.Provider value={{realUser, setUser}}>
          <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
            {realUser ? (
              <>
                <Navbar />
                {children}
              </>
            ) : (
              <>
                <Login />
              </>
            )}
            </ThemeProvider>
            
        </AuthContext.Provider>
           
    </div>
  );
}
