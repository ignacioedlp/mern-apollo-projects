import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../graphql/projects.js";
import { UPDATE_TASK } from "../graphql/tasks.js";
import { TaskForm } from "../components/TaskForm.jsx";
import TaskCard from "../components/TaskCard.jsx";
import Navbar from "../components/Navbar.jsx";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import Spinner from "../components/Spinner.jsx";

function ProjectDetails() {
  const params = useParams();
  const [showModal, setShowModal] = useState(false);

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id: params.id },
  });

  const [updateTask] = useMutation(UPDATE_TASK, {
    refetchQueries: [
      {
        query: GET_PROJECT,
        variables: { id: params.id },
      },
      "GetProject",
    ],
  });

  if (loading) return (
    <div className="flex flex-wrap justify-center p-[13px] gap-14">
      <Spinner />
    </div>
  )
  if (error) return <>Error :(</>;

  const tasksByState = {};
  data.project.tasks.forEach((task) => {
    if (tasksByState[task.state]) {
      tasksByState[task.state].push(task);
    } else {
      tasksByState[task.state] = [task];
    }
  });

  const startDrag = (e, task) => {
    e.dataTransfer.setData("task", JSON.stringify(task));
  };

  const draggingOver = (e) => {
    e.preventDefault();
  }

  const onDrop = (e, state) => {
    const task = JSON.parse(e.dataTransfer.getData("task"));
    console.log(task);
    const newTask = {
      id: task._id,
      name: task.name,
      projectId: task.projectId,
      state: state,
    }
    // TODO: UDPATE TASK HERE with GRAPHQL
    updateTask({ variables: { ...newTask } })
  }

  // Scroll si es 
  return (
    <div className="flex flex-col gap-10 md:mx-[30px]">
      <Navbar />
      <div className="flex justify-between p-4 items-center">
        <div className=" flex flex-col">
          <h2 className="text-[34px] font-bold">
            {data.project.name}
          </h2>
          <p className="mt-1.5 text-sm text-gray-500">
            {data.project.description}
          </p>
        </div>
        <div className="p-2 md:p-3 shadow-sm shadow-[#271B1B] rounded-full cursor-pointer">
          <BsPlusLg className="w-5 h-5 md:w-8 md:h-8 text-[#808080]" onClick={() => setShowModal(true)} />
        </div>
      </div>
      <div className="flex justify-around gap-8 flex-col md:flex-row md:h-screen my-5 md:mt-0">
        <div
          className="w-full md:w-1/3"
          draggable="true"
          onDragOver={(e => draggingOver(e))}
          onDrop={(e) => onDrop(e, 'todo')}
        >
          <div className="flex justify-between items-center px-[55px]">
            <h2 className="text-xl font-bold mb-4">To-Do</h2>
            <BiDotsHorizontalRounded className="text-[#8A8687]" />
          </div>
          <div className="flex flex-col px-[55px] space-y-3">
            {tasksByState['todo']?.map((task) => (
              <TaskCard key={task._id} task={task} startDrag={startDrag} />
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/3"
          draggable="true"
          onDragOver={(e => draggingOver(e))}
          onDrop={(e) => onDrop(e, 'in-progress')}
        >
          <div className="flex justify-between items-center px-[55px]">
            <h2 className="text-xl font-bold mb-4">In progress</h2>
            <BiDotsHorizontalRounded className="text-[#8A8687]" />
          </div>
          <div className="flex flex-col px-[55px] space-y-3">
            {tasksByState['in-progress']?.map((task) => (
              <TaskCard key={task._id} task={task} startDrag={startDrag} />
            ))}
            <div />
          </div>
        </div>
        <div className="w-full md:w-1/3"
          draggable="true"
          onDragOver={(e => draggingOver(e))}
          onDrop={(e) => onDrop(e, 'done')}
        >
          <div className="flex justify-between items-center px-[55px]">
            <h2 className="text-xl font-bold mb-4">Done</h2>
            <BiDotsHorizontalRounded className="text-[#8A8687]" />
          </div>
          <div className="flex flex-col px-[55px] space-y-3">
            {tasksByState['done']?.map((task) => (
              <TaskCard key={task._id} task={task} startDrag={startDrag} />
            ))}
          </div>
        </div>
      </div>
      {showModal && (
        <TaskForm showModalHandle={setShowModal} projectId={params.id} />
      )}
    </div>
  );
}

export default ProjectDetails;
