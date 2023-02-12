import Project from "../models/Project.js";
import Task from "../models/Task.js";

export const resolvers = {
  Query: {
    hello: () => "Hello world!",
    projects: async () => await Project.find(),
    project: async (_, { _id }) => Project.findById(_id),
    tasks: async () => await Task.find(),
    task: async (_, { _id }) => Task.findById(_id),
  },
  Mutation: {
    createProject: async (_, { name, description }) => {
      const project = new Project({
        name,
        description,
      });
      await project.save();
      return project;
    },

    deleteProject: async (_, { _id }) => {
      const projectDeleted = Project.findByIdAndDelete(_id);
      if (!projectDeleted) throw new Error("Project not found");

      // Delete all tasks related to the project
      await Task.remove({ projectId: _id });

      return projectDeleted;
    },

    updateProject: async (_, args) => {
      const projectUpdated = await Project.findByIdAndUpdate(args._id, args, {
        new: true,
      });
      if (!projectUpdated) throw new Error("Project not found");
      return projectUpdated;
    },

    createTask: async (_, { name, description, projectId }) => {
      const projectFound = await Project.findById(projectId);
      if (!projectFound) throw new Error("Project not found");

      const task = new Task({
        name,
        description,
        projectId,
      });
      await task.save();
      return task;
    },

    deleteTask: async (_, { _id }) => {
      const taskDeleted = await Task.findByIdAndDelete(_id);
      if (!taskDeleted) throw new Error("Task not found");
      return taskDeleted;
    },

    updateTask: async (_, args) => {
      const taskUpdated = await Task.findByIdAndUpdate(args._id, args, {
        new: true,
      });
      if (!taskUpdated) throw new Error("Task not found");
      return taskUpdated;
    },
  },
  Project: {
    tasks: async (parent) => await Task.find({ projectId: parent._id }),
  },
  Task: {
    project: async (parent) => await Project.findById(parent.projectId),
  },
};
