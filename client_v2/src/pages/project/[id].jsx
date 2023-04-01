import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../../graphql/projects.js";
import { UPDATE_TASK } from "../../graphql/tasks.js";
import { TaskForm } from "../../components/TaskForm.jsx";
import TaskCard from "../../components/TaskCard.jsx";
import Navbar from "../../components/Navbar.jsx";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";
import Spinner from "../../components/Spinner.jsx";
import { useRouter } from 'next/router';
import { TaskFormUpdate } from "../../components/TaskFormUpdate.jsx";


function Id() {
  const [showModal, setShowModal] = useState(false);
  const [showModalTask, setShowModalTask] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  });

  const [updateTask] = useMutation(UPDATE_TASK, {
    refetchQueries: [
      {
        query: GET_PROJECT,
        variables: { id },
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

  const handleUpdateOpen = (e, task) => {
    setCurrentTask(task);
    setShowModalTask(true);
  };

  const draggingOver = (e) => {
    e.preventDefault();
  }

  const onDrop = (e, state) => {
    const task = JSON.parse(e.dataTransfer.getData("task"));
    const newTask = {
      id: task._id,
      name: task.name,
      projectId: task.projectId,
      state: state,
    }
    updateTask({ variables: { ...newTask } })
  }

  // Scroll si es 
  return (
    <div className="flex flex-col gap-10 md:mx-[30px]">
      <Navbar />
      <div className="flex items-center justify-between p-4">
        <div className="flex flex-col ">
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
      <div className="flex flex-col justify-around gap-8 my-5 md:flex-row md:h-screen md:mt-0">
        <div
          className="w-full md:w-1/3"
          draggable="true"
          onDragOver={(e => draggingOver(e))}
          onDrop={(e) => onDrop(e, 'todo')}
        >
          <div className="flex justify-between items-center px-[55px]">
            <h2 className="mb-4 text-xl font-bold">To-Do</h2>
            <BiDotsHorizontalRounded className="text-[#8A8687]" />
          </div>
          <div className="flex flex-col px-[55px] space-y-3">
            {tasksByState['todo']?.map((task) => (
              <TaskCard key={task._id} task={task} startDrag={startDrag} handleUpdate={handleUpdateOpen} />
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/3"
          draggable="true"
          onDragOver={(e => draggingOver(e))}
          onDrop={(e) => onDrop(e, 'in-progress')}
        >
          <div className="flex justify-between items-center px-[55px]">
            <h2 className="mb-4 text-xl font-bold">In progress</h2>
            <BiDotsHorizontalRounded className="text-[#8A8687]" />
          </div>
          <div className="flex flex-col px-[55px] space-y-3">
            {tasksByState['in-progress']?.map((task) => (
              <TaskCard key={task._id} task={task} startDrag={startDrag} handleUpdate={handleUpdateOpen} />
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
            <h2 className="mb-4 text-xl font-bold">Done</h2>
            <BiDotsHorizontalRounded className="text-[#8A8687]" />
          </div>
          <div className="flex flex-col px-[55px] space-y-3">
            {tasksByState['done']?.map((task) => (
              <TaskCard key={task._id} task={task} startDrag={startDrag} handleUpdate={handleUpdateOpen} />
            ))}
          </div>
        </div>
      </div>
      {showModal && (
        <TaskForm showModalHandle={setShowModal} projectId={id} />
      )}
      {showModalTask && (
        <TaskFormUpdate showModalHandle={setShowModalTask} projectId={id} task={currentTask} />
      )}
    </div>
  );
}

export default Id;