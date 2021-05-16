const express = require("express");
const app = express();
app.use(express.json());
const expressGraphQl = require("express-graphql").graphqlHTTP;
const schema = require("./manga").schema;
const RootQueryType = require("./manga").RootQueryType;
const MangaType = require("./manga").MangaType;
const fetch = require("node-fetch");

var score = 9;

var query = `query  {
    searchByScore(score: ${score}){
        mal_id
        title
        score
    }
}`;
 

const myData = []

fetch('http://localhost:8000/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
    // variables: { dice, sides },
  })
})
  .then(r => r.json())
//   console.log('data returned:', myData);   console.log('data returned:', JSON.stringify(v))
  .then(v =>{ myData.push(v.data.searchByScore); });

 

app.use(
    "/graphql",
    expressGraphQl({
      schema: schema,
      graphiql: true,
    })
  );


  app.get("/", (req, res)=> {
    res.status(200).send(JSON.stringify(myData));
})


const port = process.env.port || 8000;

// app.post("/graphql", (req, res)=> {
//    const data =  res.data();
//    console.log(data)
// })

app.listen(port, () => console.log( `server running on http://localhost:${port}`));