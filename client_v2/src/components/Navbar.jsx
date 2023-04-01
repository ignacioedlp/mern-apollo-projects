import React from 'react'
import { FaSignOutAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import useAuth from "../hooks/userAuth.jsx";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  const { logout } = useAuth();

  const router = useRouter();

  return (
    <header>
      <div className="flex flex-wrap p-5 flex-row items-center justify-between font-bold">
        <Link className="flex text-base items-center text-[#DE38A6] mb-4 md:mb-0" href='/'>
          <Image src="/logo.png" alt="ProjectX" className="w-11 h-11 rounded-full" width={44} height={44}/>
        </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <div onClick={() => router.push("/project")}>
            <p className="mr-5 text-[#8A8687] hover:text-[#DE38A6] cursor-default">Projects</p>
          </div>
          <div onClick={() => router.push("/profile")}>
            <p className="mr-5 text-[#8A8687] hover:text-[#DE38A6] cursor-default">Profile</p>
          </div>
          <FaSignOutAlt className="mr-5 text-[#8A8687] hover:text-[#DE38A6] cursor-default" onClick={() => logout()} />
        </nav>
      </div >
    </header >
  )
}

export default Navbar