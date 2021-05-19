import React, { useState } from "react";
import { CREATE_USER_MUTATION } from "../GRAPHQL/Mutation";
import { useMutation } from "@apollo/client";

function AddUser() {
  const [name, setName] = useState("");
  const [plays, setPlays] = useState("");
  console.log(name, plays);
  const [createUser, { error }] = useMutation(CREATE_USER_MUTATION);
  const addUser = () => {
    let input = {
      name: name,
      plays: plays,
    };
    createUser({
      variables: {
        input,
      },
    });

    if (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="add a name"
        value={name}
        onChange={({ target }) => setName(target.value)}
      />
      <input
        type="text"
        placeholder="add a plays"
        value={plays}
        onChange={({ target }) => setPlays(target.value)}
      />
      <button onClick={addUser}>Add User</button>
    </div>
  );
}

export default AddUser;
