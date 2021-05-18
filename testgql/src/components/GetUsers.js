import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_USERS } from "../GRAPHQL/Query";

function GetUsers() {
  const { error, loading, data } = useQuery(LOAD_USERS);
    const [users, setUsers] = useState([])
  useEffect(() => {
if(!loading){
    setUsers(data.users);
    console.log(data.users);
}
   
  }, [data]);
  return (
    <div>
      <ul>
          
      {loading ? <h1>Loading...</h1> :  users.map((user) => (
          <li>
            <h2>{user.name}</h2>
            <p>{user.plays}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetUsers;
