import Project from "../models/Project.js";
import Task from "../models/Task.js";
import User from "../models/User.js";
import Category from "../models/Category.js";

export const resolvers = {
  Query: {
    hello: () => "Hello world!",
    // projects resolver recibe un owner y retorna todos los proyectos que tengan ese owner
    projects: async (_, { owner }) => await Project.find({ owner: owner }),
    project: async (_, { _id }) => Project.findById(_id),
    tasks: async () => await Task.find(),
    task: async (_, { _id }) => Task.findById(_id),
    users: async () => await User.find(),
    user: async (_, { _id }) => User.findById(_id),
    categories: async (_, { owner }) => await Category.find({ owner: owner }),
  },
  Mutation: {
    createProject: async (_, { name, description, owner, categoryId }) => {
      const project = new Project({
        name,
        description,
        owner,
        categoryId,
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

    createTask: async (_, { name, description, projectId, categoryId }) => {
      const projectFound = await Project.findById(projectId);
      if (!projectFound) throw new Error("Project not found");

      const task = new Task({
        name,
        description,
        projectId,
        categoryId,
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
    createCategory: async (_, { name, color, owner }) => {
      const category = new Category({
        name,
        color,
        owner,
      });
      await category.save();
      return category;
    },
  },
  Project: {
    tasks: async (parent) => await Task.find({ projectId: parent._id }),
    category: async (parent) => await Category.findById(parent.categoryId),
  },
  Task: {
    project: async (parent) => await Project.findById(parent.projectId),
    category: async (parent) => await Category.findById(parent.categoryId),
  },
};
