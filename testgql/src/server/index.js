const express = require('express');
const cors = require('cors');
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');

const USERS = [
  { id:1,name: "John Doe", plays: "Hello world" },
  { id:2,name: "Jane Doe", plays: "Hi, planet!" },
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
`);

const mapUser = (user, id) => user && ({ id, ...user });

const root = {
  users: () => USERS.map(mapUser),
  user: ({ id }) => mapUser(USERS[id], id),
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