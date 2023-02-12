import React from "react";
import { ProjectForm } from "../components/ProjectForm.jsx";
import { ProjectList } from "../components/ProjectList.jsx";

function Projects() {
  return (
    <div>
      <h1>Projects</h1>
      <ProjectList />
      <ProjectForm />
    </div>
  );
}

export default Projects;
