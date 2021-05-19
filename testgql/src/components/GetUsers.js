import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_USERS, GET_USER } from "../GRAPHQL/Query";

function GetUsers() {
    const { error:error1, loading: loading1, data:data1 } = useQuery(LOAD_USERS);
  const { error, loading, data } = useQuery(GET_USER);
  const [users, setUsers] = useState([]);
  const [isarray, setIsarray] = useState(false);

  useEffect(() => {
    // if (!loading) {
    //   setUsers(data.users);
    //   console.log(data.users);
    // }
    if (!loading && !isarray) {
      setUsers(data.user);
      console.log(users);
      console.log(isarray);
      console.log(data);
    }
  }, [data, isarray]);

  
  function setter(e) {
    setIsarray(!isarray)
    setUsers(data1.users);
    console.log(users);
    console.log(isarray);
    console.log(data1.users);
  }
  return (
    <div>
     
        <button onClick={setter}>Submit</button>
     

      <ul>
        {loading ? (
          <h1>Loading...</h1>
        ) : (isarray ? 
          users.map((user) => (
            <li>
              <h2>{user.name}</h2>
              <p>{user.plays}</p>
            </li>
          ))
      :  
          <li>
            <h2>{users.name}</h2>
            <p>{users.plays}</p>
          </li>
         )}
      </ul>
    </div>
  );
}

export default GetUsers;
