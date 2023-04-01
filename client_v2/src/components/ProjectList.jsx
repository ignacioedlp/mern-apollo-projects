import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/projects";
import { ProjectCard } from "./ProjectCard";
import Spinner from "./Spinner";

export function ProjectList({ user, handleEditProject }) {
  const { loading, error, data } = useQuery(GET_PROJECTS, {
    variables: { owner: user.id },
  });

  if (loading) return (
    <div className="flex flex-wrap justify-center p-[13px] gap-14">
      <Spinner />
    </div>
  )
  if (error) return console.error(error.name);

  return (
    <div className="flex flex-wrap justify-center p-[13px] gap-14">
      {
        data.projects.map((project) => (
          <ProjectCard key={project._id} project={project} user={user} handleEditProject={handleEditProject} />
        ))
      }
    </div >
  );
}
