import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios"
import { AnyARecord } from 'dns';




// var score = 9;

// var query = `query  {
//     searchByScore(score: ${score}){
//         mal_id
//         title
//         score
//     }
// }`;







function App() {
const [data, setData] = useState([]);

useEffect(()=>{
   axios({
      method: "get",
      headers: { 'Content-Type': 'application/json',"Access-Control-Allow-Origin": true },
      url: " http://localhost:8000/mangalist",
    })
      .then(response => response)
      .then((v) => {
       setData(v.data);
       
      })
      .catch(function (error) {
        console.log(error);
      });
  
  
}, [])
console.log("data returned:", data);

  return (
    <div className="App">
     {data.map(item => (
       <h3>{item.title}</h3>
     ))}
    </div>
  );
}

export default App;
