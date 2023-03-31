import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "../graphql/tasks.js";
import { GET_PROJECT } from "../graphql/projects.js";
import { BsFillTrash3Fill, BsFlagFill } from "react-icons/bs";
import moment from 'moment';

function TaskCard({ task, startDrag }) {
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [
      {
        query: GET_PROJECT,
        variables: { id: task.projectId },
      },
      "GetProject",
    ],
  });

  const rows = {
    boxShadow: "0.35857857518725544px 0.3984206390969505px 1.3936523876613545px -0.75px rgba(0, 0, 0, 0.15), 1.0861546942765228px 1.2068385491961364px 4.221451552864179px -1.5px rgba(0, 0, 0, 0.14397), 2.8711276392016316px 3.1901418213351462px 11.158931867483412px -2.25px rgba(0, 0, 0, 0.13405), 9px 10px 34.979422522391644px -3px rgba(0, 0, 0, 0.1)",
  }

  return (
    <div
      style={rows}
      className="bg-white rounded-lg"
      draggable
      onDragStart={(e) => {
        startDrag(e, task);
      }}>
      <div className="p-6 first-letter:">
        <h3 className="text-[15px] text-black">{task.name}</h3>
        <p className="text-[13px] text-[#817E7E]">{task.description}</p>
      </div>
      {/*  <!-- Action base sized with lead icon buttons  --> */}
      <div className="flex justify-between gap-2 p-6 pt-0">
        <div className="flex items-center gap-1">
          <BsFlagFill className="h-3 w-3 text-[#817E7E]" />
          <p className="text-[13px] text-[#817E7E]">{moment(Date(task.createdAt)).format('MMM D')}</p>
        </div>
        <button
          className=""
          onClick={() => {
            deleteTask({ variables: { id: task._id } });
          }}
        >
          <BsFillTrash3Fill className="h-5 w-5 text-[#DE38A6] hover:text-[#f03fb5]" />
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
