// https://api.jikan.moe/v3/top/manga/1
const data = require("./manga.json");
// const express = require("express");

// const app = express();
const {
  GraphQLSchema,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID,
  buildSchema,
  GraphQLFloat,
} = require("graphql");

 const MangaType = new GraphQLObjectType({
  name: "MangaType",
  description: "manga type",
  fields: () => ({
    mal_id: { type: GraphQLID },
    rank: { type: GraphQLNonNull(GraphQLInt) },
    url: { type: GraphQLNonNull(GraphQLString) },
    score: { type: GraphQLNonNull(GraphQLFloat) },
    title: { type: GraphQLNonNull(GraphQLString) },
  }),
});

 const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "root query",
  fields: () => ({
    singleManga: {
      type: MangaType,
      description: "A single manga",
      args: { title: { type: GraphQLNonNull(GraphQLString) } },
      resolve: (parent, args) => {
        return data["top"].find((manga) => manga.title === args.title);
      },
    },
    searchByScore: {
      type: new GraphQLList(MangaType),
      description: "A list of manga based on score",
      args: { score: { type: GraphQLNonNull(GraphQLFloat) } },
      resolve: (parent, args) => {
        return data["top"].filter((manga) => Math.floor(manga.score) === args.score);
      },
    },
  }),
});


// const newSchema = new buildSchema({
  
// })

 const schema = new GraphQLSchema({
  query: RootQueryType,
});

// app.use(
//   "/graphql",
//   expressGraphQl({
//     schema: schema,
//     graphiql: true,
//   })
// );

// app.listen(5000, () => {
//   console.log(`server running on http://localhost:5000`);
// });
module.exports = {schema, RootQueryType, MangaType}