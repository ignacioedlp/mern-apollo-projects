import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../graphql/projects.js";
import { TaskForm } from "../components/TaskForm.jsx";
import TaskCard from "../components/TaskCard.jsx";

function ProjectDetails() {
  const params = useParams();

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id: params.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <>Error :(</>;

  return (
    <div>
      <h2>{data.project.name}</h2>
      <p>{data.project.description}</p>
      <ul>
        {data.project.tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </ul>

      <h3>Create a new task</h3>
      <TaskForm projectId={params.id} />
    </div>
  );
}

export default ProjectDetails;
