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
    <>
      {/*<!-- Component: User profile card --> */}
      <div className="overflow-hidden rounded bg-white text-center text-slate-500 shadow-md shadow-slate-200 w-72">
        {/*  <!-- Image --> */}
        {/*  <!-- Body--> */}
        <div className="p-6">
          <header className="mb-4">
            <h3 className="text-xl font-medium text-slate-700">{task.name}</h3>
            <p className=" text-slate-400">{task.description}</p>
          </header>
        </div>
        {/*  <!-- Action base sized with lead icon buttons  --> */}
        <div className="flex justify-end gap-2 p-6 pt-0">
          <button
            className="inline-flex h-10 flex-1 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded bg-primary px-5 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-primary-200 focus:text-primary-700  focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none text-white"
            onClick={() => {
              deleteTask({ variables: { id: task._id } });
            }}
          >
            <span className="order-2">Delete task</span>
          </button>
        </div>
      </div>
      {/*<!-- End User profile card --> */}
    </>
  );
}

export default TaskCard;
