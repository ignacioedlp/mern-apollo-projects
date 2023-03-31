import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query Query($owner: ID!) {
    categories(owner: $owner) {
      _id
      color
      createdAt
      name
      owner
      updatedAt
    }
  }
`;

// Create a new category
export const CREATE_CATEGORY = gql`
  mutation ($name: String!, $color: String, $owner: ID!) {
    createCategory(name: $name, color: $color, owner: $owner) {
      _id
      name
      color
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation ($id: ID!) {
    deleteCategory(_id: $id) {
      _id
      name
    }
  }
`;