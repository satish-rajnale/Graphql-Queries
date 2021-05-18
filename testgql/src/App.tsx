import React, { useEffect, useState } from "react";

import "./App.css";
import axios from "axios";

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

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": true,
        crossdomain: true,
      },
      url: "http://localhost:8000/graphql",
      data: {
        query,
      },
    })
      .then((response) => response.data)
      .then((v) => {
        setData(v.data.searchByScore);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  console.log("data returned:", data);

  return (
    <div className="App">
      {data.map((item) => (
        <div key={item. mal_id} className="card">
        <img src={item.image_url}/>
          <h5>{item.title}</h5>
        </div>
      ))}
    </div>
  );
}

export default App;
