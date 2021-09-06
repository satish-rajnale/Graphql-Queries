import type { Component } from "solid-js";
import { createClient } from "@urql/core";
import  {createResource} from "solid-js";

const client = createClient({
  url : "http://localhost:4000"
});

const [todos] = createResource(() => 
  client.query(`
  query {
    getTodos{
      id
      done
      text
    }
  }
  `).toPromise()
    .then(({data}) => console.log(data))
  );

const App: Component = () => {
  return (
    <div >
     Hello
    </div>
  );
};

export default App;
