import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../graphql/projects";
import { CREATE_TASK } from "../graphql/tasks";

export function TaskForm({ projectId }) {
  const [task, setTask] = useState({
    name: "",
    description: "",
    projectId: projectId,
  });

  const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
    refetchQueries: [
      {
        query: GET_PROJECT,
        variables: { id: projectId },
      },
      "GetProject",
    ],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createTask({ variables: { ...task } });
  };

  return (
    <div>
      {error && <p>Error :( Please try again</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={handleChange} />
        <label htmlFor="description">Description</label>
        <input type="text" name="description" onChange={handleChange} />
        <button
          type="submit"
          disabled={!task.name || !task.description || loading}
        >
          Create
        </button>
      </form>
    </div>
  );
}
