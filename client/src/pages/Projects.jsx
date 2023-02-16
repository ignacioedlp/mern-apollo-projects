import React from "react";
import { ProjectForm } from "../components/ProjectForm.jsx";
import { ProjectList } from "../components/ProjectList.jsx";
import useAuth from "../hooks/userAuth.jsx";
import jwt_decode from "jwt-decode";

function Projects() {
  const { user } = useAuth();

  function decodeUser(token) {
    const decoded = jwt_decode(token);
    return decoded;
  }

  return (
    <section>
      <div class="container px-6 m-auto">
        <div class="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12 mt-10">
          <div class="col-span-4">
            <ProjectForm user={decodeUser(user)} />
          </div>
          <div class="col-span-4  lg:col-span-8">
            <ProjectList user={decodeUser(user)} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
