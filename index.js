const express = require("express");
const app = express();
var cors = require('cors')


app.use(cors())
app.use(express.json());
const expressGraphQl = require("express-graphql").graphqlHTTP;
const schema = require("./manga").schema;
// const RootQueryType = require("./manga").RootQueryType;
// const MangaType = require("./manga").MangaType;
// const fetch = require("node-fetch");
const axios = require("axios");
var score = 9;

var query = `query  {
    searchByScore(score: ${score}){
      title
      type
      score
      rank
       mal_id
     
     
      start_date
      members
      url
      image_url
    
     
    }
}`;

const myData = [];

// const fetchData = async () => {
//  // https://graphql-queries.vercel.app
//   await fetch('http://localhost:8000/graphql', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
//   body: JSON.stringify({
//     query,
//     // variables: { dice, sides },
//   })
// })
//   .then(r => r.json())
// //   console.log('data returned:', myData);   console.log('data returned:', JSON.stringify(v))
//   .then(v =>{ myData.push(v.data.searchByScore); });

// }
// fetchData()
const myQuery = JSON.stringify(query);
// axios.post("/graphql",
//   {myQuery}
// ).then((res) => res.json())
// .then((v) =>{ myData.push(v.data.searchByScore);  console.log('data returned:', myData);  })
// .catch(function (error) {
//   console.log(error);
// });

async function getData() {
  await axios({
    method: "post",
    headers: { 'Content-Type': 'application/json', "crossdomain": true  },
    url: " http://localhost:8000/graphql",
    data: {
      query,
    },
  })
    .then(response => response.data)
    .then((v) => {
      myData.push(v.data.searchByScore);
      console.log("data returned:", myData[0]);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getData()


app.use(
  "/graphql",
  expressGraphQl({
    schema: schema,
    graphiql: true,
  })
);

app.get("/mangalist", (req, res) => {
  res.status(200).send(JSON.stringify(myData[0]));
});

const port = process.env.port || 8000;

// app.post("/graphql", (req, res)=> {
//    const data =  res.data();
//    console.log(data)
// })

app.listen(port, () =>
  console.log(`server running on http://localhost:${port}`)
);
