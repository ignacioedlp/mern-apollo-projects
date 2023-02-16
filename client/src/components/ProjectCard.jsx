import React from "react";

import { useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { DELETE_PROJECT, GET_PROJECTS } from "../graphql/projects";

export function ProjectCard({ project, user }) {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    refetchQueries: [
      {
        query: GET_PROJECTS,
        variables: { owner: user.id },
      },
      "GetProjects",
    ],
  });

  return (
    <>
      {/*<!-- Component: User profile card --> */}
      <div className="overflow-hidden rounded bg-white text-center text-slate-500 shadow-md shadow-slate-200">
        <div className="p-6">
          <header className="mb-4">
            <h3 className="text-xl font-medium text-slate-700">
              {project.name}
            </h3>
            <p className=" text-slate-400">{project.description}</p>
          </header>
        </div>
        {/*  <!-- Action base sized with lead icon buttons  --> */}
        <div className="flex justify-end gap-2 p-6 pt-0">
          <button
            className="inline-flex h-10 flex-1 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded bg-primary px-5 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-primary-200 focus:text-primary-700  focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none text-white"
            onClick={() => {
              deleteProject({ variables: { id: project._id } });
            }}
          >
            <span className="order-2">Delete project</span>
          </button>
          <button
            className="inline-flex h-10 flex-1 items-center justify-center gap-2 whitespace-nowrap rounded bg-secondary px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
            onClick={() => navigate(`/projects/${project._id}`)}
          >
            <span className="order-2">Go to details</span>
          </button>
        </div>
      </div>
      {/*<!-- End User profile card --> */}
    </>
  );
}
