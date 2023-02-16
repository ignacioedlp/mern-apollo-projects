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
    <section>
      <div class="container px-6 m-auto">
        <div class="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12 mt-10">
          <div class="col-span-4">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {data.project.name}
            </h2>
            <p className="mt-1.5 text-sm text-gray-500">
              {data.project.description}
            </p>

            <TaskForm projectId={params.id} />
          </div>
          <div class="col-span-4  lg:col-span-8">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Tasks {data.project.tasks.length}
            </h2>
            <div className="flex gap-4 flex-wrap">
              {data.project.tasks.map((task) => (
                <TaskCard key={task._id} task={task} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetails;
