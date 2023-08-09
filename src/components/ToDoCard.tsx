import React from 'react'

type listProps = {
  id: string;
  task: string;
  priority: number;
  done: boolean;
};

export default function ToDoCard(props) {
  return (
    <div>
      <h1>{props.task}</h1>
      <h2>{props.priority}</h2>
      <input type="checkbox" onClick={() => props.doneTodo(props.id)}/>
      <button onClick={() => props.deleteTodo(props.id)}>X</button>
    </div>
  );
}