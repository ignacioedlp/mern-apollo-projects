import React from "react";

import { useRouter } from "next/router";

import { useMutation } from "@apollo/client";
import { DELETE_PROJECT, GET_PROJECTS } from "../graphql/projects";
import { AiOutlineEye } from "react-icons/ai";
import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";


export function ProjectCard({ project, user, handleEditProject }) {
  const router = useRouter();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    refetchQueries: [
      {
        query: GET_PROJECTS,
        variables: { owner: user.id },
      },
      "GetProjects",
    ],
  });

  const rows = {
    boxSizing: "border-box",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 20px 20px 20px",
    boxShadow: "0.35857857518725544px 0.3984206390969505px 1.3936523876613545px -0.75px rgba(0, 0, 0, 0.15), 1.0861546942765228px 1.2068385491961364px 4.221451552864179px -1.5px rgba(0, 0, 0, 0.14397), 2.8711276392016316px 3.1901418213351462px 11.158931867483412px -2.25px rgba(0, 0, 0, 0.13405), 9px 10px 34.979422522391644px -3px rgba(0, 0, 0, 0.1)",
    overflow: "visible",
    position: "relative",
    alignContent: "center",
    flexWrap: "nowrap",
    gap: 0,
    borderRadius: 17,
  }

  return (

    <div style={rows} className="w-full md:w-[330px] h-[310px]">
      <div className="flex  w-full p-[13px] justify-between items-center">
        <Image src="/logo.png" alt="ProjectX" className="rounded-full w-11 h-11" width={44} height={44} />
        <div>
          <div style={{ backgroundColor: project?.category?.color || '#333333' }} className="flex justify-center px-2 py-2 text-sm font-semibold text-black rounded-3xl">
            {project.category?.name == null ? 'No category' : project.category.name}
          </div>
        </div>
      </div>
      <div className="px-[10px] h-36 w-full flex flex-col gap-4">
        <h3 className="text-[22px] font-bold text-black">
          {project.name}
        </h3>
        <p className="text-[14px] font-semibold text-[#8C8C8C]">{project.description}</p>
      </div>
      <div className="flex justify-around w-full gap-2 py-6">
        <div className="flex gap-3">
          <button
            className="text-[#DE38A6] text-sm flex justify-center items-center gap-2 rounded-3xl px-2 py-2 border-2 border-[#DE38A6]"
            onClick={() => {
              deleteProject({ variables: { id: project._id } });
            }}
          >
            <BsFillTrash3Fill className="w-5 h-5" />
          </button>
          <button
            className="text-[#DE38A6] text-sm flex justify-center items-center gap-2 rounded-3xl px-2 py-2 border-2 border-[#DE38A6]"
            onClick={(e) => {
              handleEditProject(e, project);
            }}
          >
            <BsFillPencilFill className="w-5 h-5" />
          </button>
        </div>
        <div
          className="text-white text-sm flex justify-center items-center gap-2 rounded-3xl px-2 py-2 bg-[#DE38A6]"
        >
          <AiOutlineEye className="w-5 h-5" />
          <Link href="/project/[id].jsx" as={`/project/${project._id}`}>
            <p>View project</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
