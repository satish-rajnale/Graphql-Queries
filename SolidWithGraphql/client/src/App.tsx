import type { Component } from "solid-js";
import { createClient } from "@urql/core";
import  {createResource, For, createSignal} from "solid-js";

const client = createClient({
  url : "http://localhost:4000"
});

const [todos, {refetch}] = createResource(() => 
  client.query(`
  query {
    getTodos{
      id
      done
      text
    }
  }
  `).toPromise()
    .then(({data}) => data.getTodos)
  );

const App: Component = () => {
  const [text, setText] = createSignal("");

  const toggle = async (id) => {
    await client.mutation(`
      mutation($id: ID!, $done: Boolean!) {
        setDone(id: $id, done: $done){
          id
        }
      }`,{ id, done: !todos().find((todo) => todo.id == id).done}
      )
      .toPromise();
  }
  const onAdd = async () => {
    await client.mutation(`
      mutation($text: String!) {
        addTodo(text: $text){
          id
        }
      }`,{ text: text() }
      ).toPromise();
      refetch();
    setText("");
  }

  return (
    <div >
      <For each={todos()}>
        {({id, done, text}) => <div>
            <input type="checkbox" checked={done} onclick={() => toggle(id)}/>
            <span>{text}</span>
          </div>}
      </For>
      <div>
        <input type="text" value={text()} oninput={(e)=> setText(e.currentTarget.value)}/>
        <button onclick={onAdd} >ADD</button>
      </div>
    </div>
  );
};

export default App;
