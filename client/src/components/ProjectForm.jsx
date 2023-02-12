import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECT, GET_PROJECTS } from "../graphql/projects";

export function ProjectForm() {
  const [project, setProject] = useState({
    name: "",
    description: "",
  });

  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [
      {
        query: GET_PROJECTS,
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
    <div>
      <h2>Create a new project</h2>
      {error && <p>Error :( Please try again</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={handleChange} />
        <label htmlFor="description">Description</label>
        <input type="text" name="description" onChange={handleChange} />
        <button
          type="submit"
          disabled={!project.name || !project.description || loading}
        >
          Create
        </button>
      </form>
    </div>
  );
}
