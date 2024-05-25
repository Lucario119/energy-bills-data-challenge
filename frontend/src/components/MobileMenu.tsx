"use client"

import Link from "next/link";

interface MobileMenuProps {
  handleCloseMenu: () => void
}

export default function MobileMenu({handleCloseMenu}: MobileMenuProps) {

  return (
	
  <div className='md:hidden w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50 flex overflow-hidden'>
    <div  style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '90%' }} onTouchStart={handleCloseMenu}></div>
    <ul className="flex flex-col text-[#5b9406] p-4 gap-10 font-bold bg-white">

     <li>
         <Link href='/'>
             Dashboard
         </Link>
     </li>
     <li>
       <Link href='/bills-library'>
         Biblioteca 
       </Link>
     </li>
   </ul>
  </div>
  );
}
