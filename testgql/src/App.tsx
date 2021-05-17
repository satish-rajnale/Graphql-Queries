import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios"
import { AnyARecord } from 'dns';




var score = 9;

var query = `query  {
    searchByScore(score: ${score}){
        mal_id
        title
        score
    }
}`;


const myData: Array<AnyARecord> = [];

async function getData() {
  await axios({
    method: "post",
    url: " http://localhost:8000/graphql",
    headers:"Access-Control-Allow-Origin: true",
    data: {
      query,
    },
  })
    .then(response => response.data)
    .then((v) => {
      myData.push(v.data.searchByScore);
      console.log("data returned:", myData);
    })
    .catch(function (error) {
      console.log(error);
    });
}
getData()


function App() {
  return (
    <div className="App">
      <header className="App-header">
       
      </header>
    </div>
  );
}

export default App;
