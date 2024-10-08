"use client";
import { Inter as FontSans } from "next/font/google";
import "../app/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { AuthContext } from "@/components/AuthContext";
import { useAuth } from "@/components/useAuth";
import { Metadata } from "next";
import NavbarLogin from "@/components/NavbarLogin";

const fontSans = FontSans({ 
  subsets: ["latin"],
  variable: "--font-sans"
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (

    <html lang="en">
      <body 
        suppressHydrationWarning={true}
        className={cn("min-h-screen w-full bg-background font-sans antialiased flex flex-col items-center", fontSans.variable)}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
            {children}
            <Toaster />
            </ThemeProvider>
      </body>
    </html>
  );
}
