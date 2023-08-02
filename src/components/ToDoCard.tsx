import React from 'react'

type listProps = {
    task: string,
    priority: number,
    done: boolean
}

export default function ToDoCard(props: listProps) {
  return (
    <div>
        <h1>{props.task}</h1>
        <h2>{props.priority}</h2>
        <input type="checkbox"/>
    </div>
  )
}