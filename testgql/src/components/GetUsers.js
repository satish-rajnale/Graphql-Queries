import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_USERS, GET_USER } from "../GRAPHQL/Query";

function GetUsers() {
    const { error:error1, loading: loading1, data:data1 } = useQuery(LOAD_USERS);
  const { error, loading, data } = useQuery(GET_USER);
  const [users, setUsers] = useState([]);
  const [id, setId] = useState(0);

  useEffect(() => {
    // if (!loading) {
    //   setUsers(data.users);
    //   console.log(data.users);
    // }
    if (!loading) {
      setUsers(data);
      console.log(users);
      console.log(Array.isArray(users));
      console.log(data);
    }
  }, [data]);

  
  function setter(e) {
   
    setUsers(data1.users);
    console.log(users);
    console.log(data1.users);
  }
  return (
    <div>
     
        <button onClick={setter}>Submit</button>
     

      <ul>
        {loading ? (
          <h1>Loading...</h1>
        ) : typeof users == "object" ? (
          <li>
            <h2>{users.name}</h2>
            <p>{users.plays}</p>
          </li>
        ) : (
          users.map((user) => (
            <li>
              <h2>{user.name}</h2>
              <p>{user.plays}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default GetUsers;
