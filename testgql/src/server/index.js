const express = require('express');
const cors = require('cors');
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');

const USERS = [
  { name: "John Doe", plays: "Hello world" },
  { name: "Jane Doe", plays: "Hi, planet!" },
];

const schema = buildASTSchema(gql`
  type Query {
    users: [User]
    user(id: ID!): User
  }

  type User {
    id: ID
    name: String
    plays: String
  }

  type Mutation {
    submitUser(input: UserInput!): User
  }
  
  input UserInput {
    id: ID
    name: String!
    plays: String!
  }
`);

const mapUser = (user, id) => user && ({ id, ...user });

const root = {
  users: () => USERS.map(mapUser),
  user: ({ id }) => mapUser(USERS[id], id),
  submitUser: ({ input: { id, name, plays } }) => {
    const user = { name, plays };
    let index = USERS.length;
  
    if (id != null && id >= 0 && id < USERS.length) {
      if (USERS[id].nameId !== nameId) return null;
  
      USERS.splice(id, 1, user);
      index = id;
    } else {
      USERS.push(user);
    }
  
    return mapUser(user, index);
  },
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = process.env.PORT || 4000
app.listen(port);
console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`);