import { gql } from "@apollo/client";

// get projects fot
export const GET_PROJECTS = gql`
  query Query($owner: ID!) {
    projects(owner: $owner) {
      _id
      name
      description
      owner
      createdAt
      updatedAt
      category {
        name
        color
      }
      tasks {
        name
      }
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation (
    $name: String!
    $description: String
    $owner: ID!
    $categoryId: ID
  ) {
    createProject(
      name: $name
      description: $description
      owner: $owner
      categoryId: $categoryId
    ) {
      _id
      name
      owner
      description
      categoryId
      createdAt
      updatedAt
    }
  }
`;

export const GET_PROJECT = gql`
  query ($id: ID!) {
    project(_id: $id) {
      _id
      name
      description
      createdAt
      updatedAt
      tasks {
        _id
        name
        description
        projectId
        state
        createdAt
      }
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation ($id: ID!) {
    deleteProject(_id: $id) {
      _id
      name
      description
      createdAt
      updatedAt
    }
  }
`;


