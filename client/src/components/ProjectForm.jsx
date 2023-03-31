import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_PROJECT, GET_PROJECTS } from "../graphql/projects";
import { GET_CATEGORIES } from "../graphql/categories";

export function ProjectForm({ user, handleShow }) {
  const [project, setProject] = useState({
    name: "",
    description: "",
    owner: user.id,
    categoryId: null,
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

  const { data } = useQuery(GET_CATEGORIES, {
    variables: { owner: user.id },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // setear en el proyect el category id 
    let newProject;
    if (project.category === null) {
      newProject = {
        name: project.name,
        description: project.description,
        owner: project.owner,
      };
    } else {
      newProject = project;
    }
    createProject({ variables: { ...newProject } });
    handleShow(false);
  };


  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      {error && <p>{error.message}</p>}
      {/*<!-- Component: Card with form --> */}
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none">
        <div className="flex items-start justify-between px-6 mt-4 border-gray-300 rounded-t ">
          <h3 className="text-xl font-medium text-slate-700">
            Create project
          </h3>
        </div>
        <form
          className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200"
          onSubmit={handleSubmit}
        >
          {/*  <!-- Body--> */}
          <div className="p-6">
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
                  className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[#d9259d] focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
                <label
                  htmlFor="id-b03"
                  className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500  peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#d9259d] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
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
                  className="peer relative h-10 w-full rounded border border-slate-200 px-4 pr-12 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-[#d9259d] focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                />
                <label
                  htmlFor="id-b13"
                  className="absolute left-2 -top-2 z-[1] px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-required:after:text-pink-500  peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#d9259d] peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                >
                  Project description
                </label>

                <small className="absolute flex w-full justify-between px-4 py-1 text-xs text-slate-400 transition peer-invalid:text-pink-500">
                  <span>Input field project description</span>
                </small>
              </div>
              <div className="relative my-6">
                <select
                  onChange={handleChange}
                  name="categoryId"
                  value={project.categoryId}
                  className="peer relative h-10 w-full rounded border border-slate-200 px-4 pr-12 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:[#d9259d] focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                >
                  <option value={null}>Uncategorized</option>
                  {
                    data?.categories?.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))
                  }
                </select>

                <small className="absolute flex w-full justify-between px-4 py-1 text-xs text-slate-400 transition peer-invalid:text-pink-500">
                  <span>Type your project category</span>
                </small>
              </div>
            </div>
          </div>
          {/*  <!-- Action base sized basic button --> */}
          <div className="flex justify-end p-6 gap-3 bg-white">
            <button
              className="inline-flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded bg-[#d9259d] px-5 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-[#d9259d] focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-[#bb80a8] disabled:shadow-none "
              type="submit"
              disabled={!project.name || !project.description || loading}
            >
              <span>Create</span>
            </button>
            <button
              className="text-[#d9259d] background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 border-2 border-[#d9259d] rounded"
              type="button"
              onClick={() => handleShow(false)}
            >
              Close
            </button>
          </div>
        </form>
      </div >
      {/*<!-- End Card with form --> */}
    </div >
  );
}
