import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    hello: String
    projects(owner: ID!): [Project]
    project(_id: ID!): Project
    users: [User]
    user(_id: ID!): User
    tasks: [Task]
    task(_id: ID!): Task
    categories(owner: ID!): [Category]
  }
  type Mutation {
    createProject(
      name: String!
      description: String
      owner: ID!
      categoryId: ID
    ): Project
    createTask(
      name: String!
      description: String
      projectId: ID!
      categoryId: ID
      state: String
    ): Task
    deleteProject(_id: ID!): Project
    updateProject(
      _id: ID!
      name: String!
      description: String
      categoryId: ID
    ): Project
    deleteTask(_id: ID!): Task
    updateTask(
      _id: ID!
      name: String!
      description: String
      categoryId: ID
      projectId: ID!
      state: String!
    ): Task
    createCategory(name: String!, color: String, owner: ID!): Category
    deleteCategory(_id: ID!): Category
    updateCategory(_id: ID!, name: String!, color: String): Category
  }

  type Project {
    _id: ID
    name: String
    description: String
    owner: ID
    createdAt: String
    updatedAt: String
    tasks: [Task]
    categoryId: ID
    category: Category
  }

  type Task {
    _id: ID
    name: String
    description: String
    projectId: ID
    createdAt: String
    updatedAt: String
    project: Project
    categoryId: ID
    category: Category
    state: String
  }

  type User {
    _id: ID
    username: String
    password: String
    createdAt: String
    updatedAt: String
  }

  type Category {
    _id: ID
    name: String
    color: String
    owner: ID!
    createdAt: String
    updatedAt: String
  }
`;
