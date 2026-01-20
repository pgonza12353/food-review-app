import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import NavBar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FRA",
  description: "Food Review App",
};

export default function RootLayout({ children }: { children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
          <NavBar />
          {/* Owns gradient */}
          <main className="min-h-screen bg-gradient-to-b from-[#131e29] to-[#2f4357] pt-16 pb-8">
             <div className="px-4 md:px-8 lg:px-16 mx-auto max-w-6xl mb-8">
              {children}
            </div>
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
