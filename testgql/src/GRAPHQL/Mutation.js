import { gql } from "@apollo/client";

// export const CREATE_USER_MUTATION = gql`
//  mutation   createUser($name: String!,$plays: String! ){
//         createUser(name: $name,
//             plays: $plays){
//             id 
//             name
//             plays
//         }
//       }
 
// `;
export const CREATE_USER_MUTATION = gql`
 mutation createUser($input: createUser! ){
        createUser(input : $input){
            id 
            name
            plays
        }
      }
`;
