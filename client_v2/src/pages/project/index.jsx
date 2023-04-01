import React, { useEffect, useState } from "react";
import { ProjectForm } from "../../components/ProjectForm.jsx";
import { ProjectList } from "../../components/ProjectList.jsx";
import useAuth from "../../hooks/userAuth.jsx";
import jwtDecode from "jwt-decode";
import Navbar from "../../components/Navbar.jsx";
import { BsPlusLg } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";

function Index() {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [userDecoded, userDecodedSet] = useState(null);

  useEffect(() => {
    if (user) {
      userDecodedSet(jwtDecode(user));
    }
  }, [user]);


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
          <BsPlusLg
            className="w-5 h-5 md:w-8 md:h-8 text-[#808080]"
            onClick={() => setShowModal(true)}
          />
        </div>
      </div>

      <div className="">
        {userDecoded ? <ProjectList user={userDecoded} /> : null}
      </div>
      {showModal ? (
        <ProjectForm handleShow={setShowModal} user={userDecoded} />
      ) : null}
    </div>
  );
};

export default Index;
