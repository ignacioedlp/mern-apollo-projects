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
