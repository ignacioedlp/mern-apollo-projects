import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation ($name: String!, $description: String, $projectId: ID!) {
    createTask(name: $name, description: $description, projectId: $projectId) {
      _id
      name
      description
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TASK = gql`
  mutation ($id: ID!) {
    deleteTask(_id: $id) {
      _id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
