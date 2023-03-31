import React from 'react'
import { FaSignOutAlt } from "react-icons/fa";

function Navbar() {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header>
      <div className="flex flex-wrap p-5 flex-row items-center justify-between font-bold">
        <a className="flex text-base items-center text-[#DE38A6] mb-4 md:mb-0" href='/'>
          <img src="/logo.png" alt="ProjectX" className="w-11 h-11 rounded-full" />
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 text-[#8A8687] hover:text-[#DE38A6] cursor-default" href='/projects'>Projects</a>
          <a className="mr-5 text-[#8A8687] hover:text-[#DE38A6] cursor-default" href='/profile'>Profile</a>
          <FaSignOutAlt className="mr-5 text-[#8A8687] hover:text-[#DE38A6] cursor-default" onClick={() => handleLogout()} />
        </nav>
      </div>
    </header>
  )
}

export default Navbar