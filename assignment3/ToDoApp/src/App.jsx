import React, { useState } from 'react';
import './App.css';

// Corrected Todo component
function Todo({ title, description }) {
  return (
    <div>
      <h1>{title}</h1>
      <h4>{description}</h4>
    </div>
  );
}

let ID = 4;

function App() {
  const [todo, setTodo] = useState([
    {
      id: 1,
      title: "my name is yash",
      description: "my name",
    },
    {
      id: 2,
      title: "todo2",
      description: "second item in the list",
    },
  ]);
  function Wrap({children}){
    return(
    <div style={
      {
        border:"1px solid black",
        padding: 10,
        margin:10
      }
    }>
      {children}
    </div>
    )
  }
  function Add() {
    setTodo([...todo, {
      id: ID++,
      title: "random todo",
      description: "its generated just to test the rerendering of react",
    }]);
  };

  return (
    <>
      <div className="card">
        <button onClick={Add}>
          Add ToDo
        </button>
     
        {todo.map((todo) => <Wrap><Todo key={todo.id} title={todo.title} description={todo.description} /> </Wrap>)}
        
      </div>
    </>
  );
}

export default App;
