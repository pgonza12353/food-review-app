"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav 
    className="
      w-full 
      border-b 
      p-4 
      flex 
      gap-6 
      text-white
      bg-gradient-to-b from-[#7b9cc9] to-[#365979]
    ">
      <Link 
        href="/"
        className={`hover:underline ${pathname === "/" ? "underline" : ""}`}
      > 
        Home
      </Link>     

      <Link 
        href="/reviews"
        className={`hover:underline ${pathname === "/reviews" ? "underline" : ""}`}
      > 
        Reviews
      </Link>
      
      <Link 
        href="/restaurants"
        className={`hover:underline ${pathname === "/restaurants" ? "underline" : ""}`}
      >
        Restaurants
      </Link>

      {/* App Title */}
      <div className="absolute left-1/2 transform -translate-x-1/2 font-bold italic text-xl drop-shadow-[0_0_10px_rgba(12,130,242,0.8)]">
        FoodReviewApp
      </div>
    </nav>
  );
} 