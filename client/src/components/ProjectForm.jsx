import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECT, GET_PROJECTS } from "../graphql/projects";

export function ProjectForm({ user }) {
  const [project, setProject] = useState({
    name: "",
    description: "",
    owner: user.id,
  });

  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [
      {
        query: GET_PROJECTS,
        variables: { owner: user.id },
      },
      "GetProjects",
    ],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createProject({ variables: { ...project } });
  };

  return (
    <>
      {error && <p>{error.message}</p>}
      {/*<!-- Component: Card with form --> */}
      <form
        className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200"
        onSubmit={handleSubmit}
      >
        {/*  <!-- Body--> */}
        <div className="p-6">
          <header className="mb-4 text-center">
            <h3 className="text-xl font-medium text-slate-700">
              Create project
            </h3>
          </header>
          <div className="flex flex-col space-y-8">
            {/*      <!-- Input field --> */}
            <div className="relative my-6">
              <input
                id="id-b03"
                type="name"
                name="name"
                value={project.name}
                onChange={handleChange}
                placeholder="Project name"
                className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label
                htmlFor="id-b03"
                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Project name
              </label>
              <small className="absolute flex w-full justify-between px-4 py-1 text-xs text-slate-400 transition peer-invalid:text-pink-500">
                <span>Type your project name</span>
              </small>
            </div>
            {/*      <!-- Input field --> */}
            <div className="relative my-6">
              <input
                id="id-b13"
                type="description"
                name="description"
                value={project.description}
                onChange={handleChange}
                placeholder="Project description"
                className="peer relative h-10 w-full rounded border border-slate-200 px-4 pr-12 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              />
              <label
                htmlFor="id-b13"
                className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
              >
                Project description
              </label>

              <small className="absolute flex w-full justify-between px-4 py-1 text-xs text-slate-400 transition peer-invalid:text-pink-500">
                <span>Input field project description</span>
              </small>
            </div>
          </div>
        </div>
        {/*  <!-- Action base sized basic button --> */}
        <div className="flex justify-end p-6 ">
          <button
            className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-success px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none "
            type="submit"
            disabled={!project.name || !project.description || loading}
          >
            <span>Create</span>
          </button>
        </div>
      </form>
      {/*<!-- End Card with form --> */}
    </>
  );
}
