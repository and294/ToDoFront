import React from 'react'

type listProps = {
    name: string,
    priority: number,
    done: boolean
}

export default function ToDoCard(props: listProps) {
  return (
    <div>
        <h1>{props.name}</h1>
        <h2>{props.priority}</h2>
        <input type="checkbox"/>
    </div>
  )
}