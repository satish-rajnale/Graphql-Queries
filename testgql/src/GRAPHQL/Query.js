import { gql } from "@apollo/client";

export const LOAD_USERS = gql`
  query {
    users {
      id
      name
      plays
    }
  }
`;

export const GET_USER = gql`
  query {
    user(id: 1) {
      id
      name
      plays
    }
  }
`;
