import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    hello: String
    projects: [Project]
    project(_id: ID!): Project
    tasks: [Task]
    task(_id: ID!): Task
  }
  type Mutation {
    createProject(name: String!, description: String): Project
    createTask(name: String!, description: String, projectId: ID!): Task
    deleteProject(_id: ID!): Project
    updateProject(_id: ID!, name: String!, description: String): Project
    deleteTask(_id: ID!): Task
    updateTask(_id: ID!, name: String!, description: String): Task
  }

  type Project {
    _id: ID
    name: String
    description: String
    createdAt: String
    updatedAt: String
    tasks: [Task]
  }

  type Task {
    _id: ID
    name: String
    description: String
    projectId: ID
    createdAt: String
    updatedAt: String
    project: Project
  }
`;
