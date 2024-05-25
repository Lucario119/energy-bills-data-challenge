"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false)
  return (
  <>
      <div className="h-[4.5rem] text-white w-screen bg-[#5b9406] flex justify-between px-16 items-center">
        <h1 className="text-3xl">Energy Bills</h1>
        <ul className="hidden md:flex gap-10 font-bold">
          <li>
            <Link href='/'>
                Dashboard
            </Link>
          </li>
          <li>
            <Link href='/bills-library'>
            Biblioteca de Faturas
            </Link>
         </li>
      </ul>
      <Image width={20} height={20} onClick={(e) => setOpenMenu(true)} className="md:hidden" src='/menu-svgrepo-com.svg' alt="menu-mobile"/>

    </div>
	  {openMenu && (
     <MobileMenu handleCloseMenu={()=> setOpenMenu(false)}/>
    )}
  </>
  );
}
