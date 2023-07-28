import React, { useState, useEffect } from "react";
import ToDoCard from "./ToDoCard";

type Props = {};

export default function Home({}: Props) {
  interface listItem {
    data: {
      name: string;
      priority: number;
      done: boolean;
    };
  }
  const [listFetched, setListFetched] = useState<listItem[]>([]);

  const getList = async () => {
    await fetch("http://localhost:3000/getToDos")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListFetched(data.list);
        console.log(listFetched);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  const listToRender = listFetched.map((data, i) => {
    return <ToDoCard key={i} {...data} />;
  });

  return (
    <div>
      <h1>To do</h1>
      {listToRender}
    </div>
  );
}
