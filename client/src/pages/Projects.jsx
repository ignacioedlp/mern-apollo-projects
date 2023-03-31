import React, { useState } from "react";
import { ProjectForm } from "../components/ProjectForm.jsx";
import { ProjectList } from "../components/ProjectList.jsx";
import useAuth from "../hooks/userAuth.jsx";
import jwt_decode from "jwt-decode";
import Navbar from "../components/Navbar.jsx";
import { BsPlusLg } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";

function Projects() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  function decodeUser(token) {
    const decoded = jwt_decode(token);
    return decoded;
  }

  return (
    <div className="flex flex-col gap-10 md:mx-[30px] ">
      <Navbar />
      <div className=" flex p-4">
        <h2 className="text-[34px] font-bold">My Projects</h2>
      </div>
      <div className=" flex p-4 justify-between">
        <div className="flex items-center gap-3">
          <AiOutlineSearch className="w-8 h-8 text-[#808080]" />
          <h2 className="text-[#808080] text-[22px] font-bold">My Projects</h2>
        </div>
        <div className="p-2 shadow-sm shadow-[#271B1B] rounded-full cursor-pointer">
          <BsPlusLg className="w-5 h-5 md:w-8 md:h-8 text-[#808080]" onClick={() => setShowModal(true)} />
        </div>
      </div>

      <div className="">
        <ProjectList user={decodeUser(user)} />
      </div>
      {showModal ? (
        <ProjectForm handleShow={setShowModal} user={decodeUser(user)} />
      ) : null}
    </div>
  );
}

export default Projects;
