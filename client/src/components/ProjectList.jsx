import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectList({ user }) {
  const { loading, error, data } = useQuery(GET_PROJECTS, {
    variables: { owner: user.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <>Error :(</>;

  return (
    <div className="flex gap-4 flex-wrap">
      {data.projects.map((project) => (
        <ProjectCard key={project._id} project={project} user={user} />
      ))}
    </div>
  );
}
