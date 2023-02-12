import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  {
    projects {
      _id
      name
      description
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation ($name: String!, $description: String) {
    createProject(name: $name, description: $description) {
      _id
      name
      description
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
