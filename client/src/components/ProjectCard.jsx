import React from "react";

import { useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { DELETE_PROJECT, GET_PROJECTS } from "../graphql/projects";

export function ProjectCard({ project }) {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    refetchQueries: [
      {
        query: GET_PROJECTS,
      },
      "GetProjects",
    ],
  });

  return (
    <div>
      <h2 onClick={() => navigate(`/projects/${project._id}`)}>
        {project.name}
      </h2>
      <button
        onClick={() => {
          deleteProject({ variables: { id: project._id } });
        }}
      >
        Delete
      </button>
    </div>
  );
}
