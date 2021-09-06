import { GraphQLServer } from "graphql-yoga";

let todos = [
    { 
        id : "1",
        text: "Graphql + Solid Development",
        done: false
    }
];

const typeDefs = `
    	type Todo {
            id: ID!
            done: Boolean!
            text: String!
        }
        type Query {
            getTodos : [Todo]!
        }
`;

 const resolvers = {
     Query : {
        getTodos : () => {
            return todos;
        },
     }
 };

 const server  = new GraphQLServer({
     typeDefs, resolvers
 });

 server.start(() => console.log(`server running on: http://localhost:4000`))