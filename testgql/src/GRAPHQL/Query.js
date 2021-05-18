import {gql} from "@apollo/client"

export const LOAD_USERS = gql`
query {
    users {
        id 
        name
        plays
    }
}
`