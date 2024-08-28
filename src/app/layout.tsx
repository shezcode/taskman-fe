import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { AuthContext } from "@/components/AuthContext";
import { useAuth } from "@/components/useAuth";

const fontSans = FontSans({ 
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "taskMan",
  description: "Your go-to task manager.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

//  const { user, login, logout, setUser } = useAuth();

  return (
    <html lang="en">
      <body 
        suppressHydrationWarning={true}
        className={cn("min-h-screen bg-background font-sans antialiased flex flex-col items-center", fontSans.variable)}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              {children}
              <Toaster />
            </ThemeProvider>
      </body>
    </html>
  );
}
