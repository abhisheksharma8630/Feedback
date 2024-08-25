import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"
import AuthProvider from "./authProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feedback",
  description: "Geninue feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <AuthProvider>
        <body
          className={inter.className}
          // style={{ backgroundColor: "", color: "white" }}
          >
          {children}
          <Toaster/>
        </body>
            </AuthProvider>
      </html>
  );
}
