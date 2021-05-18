import React, { useEffect, useRef, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_USERS, GET_USER } from "../GRAPHQL/Query";

function GetUsers() {
//   const { error, loading, data } = useQuery(LOAD_USERS);
  const { userLoad } = useQuery(GET_USER);
  const [users, setUsers] = useState([]);
    const myref = useRef(null)

  useEffect(() => {
      if(myref.current.value !== null ){
        let id = myref.current.value;
        console.log(myref.current.value);
        setUsers(userLoad)
        
      }

    // if (!loading) {
    //   setUsers(data.users);
    //   console.log(data.users);
    // }
  }, [myref.current?.value]);
  
  function submitForm(e){
    e.preventDefault();
    
    console.log(myref.current.value);
   }
   console.log(users);
  return (
    <div>
       <form onSubmit={submitForm}>
   <input type="text" ref={myref} />
   <button>Submit</button>
  </form>

      <ul>
        {/* {loading ? (
          <h1>Loading...</h1>
        ) : (
          users.map((user) => (
            <li>
              <h2>{user.name}</h2>
              <p>{user.plays}</p>
            </li>
          ))
        )} */}
      </ul>
    </div>
  );
}

export default GetUsers;
