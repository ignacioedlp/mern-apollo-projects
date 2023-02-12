import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/projects";

export function ProjectList() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <>Error :(</>;

  return (
    <ul>
      {data.projects.map((project) => (
        <li key={project._id}>{project.name}</li>
      ))}
    </ul>
  );
}
