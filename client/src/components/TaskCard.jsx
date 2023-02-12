import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "../graphql/tasks.js";
import { GET_PROJECT } from "../graphql/projects.js";

function TaskCard({ task }) {
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [
      {
        query: GET_PROJECT,
        variables: { id: task.projectId },
      },
      "GetProject",
    ],
  });

  return (
    <div>
      <li key={task._id}>{task.name}</li>
      <button
        onClick={() => {
          deleteTask({ variables: { id: task._id } });
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default TaskCard;
