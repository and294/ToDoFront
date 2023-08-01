import React, { useState, useEffect } from "react";
import ToDoCard from "./ToDoCard";
import Login from "./Login";

import { useDispatch, useSelector } from "react-redux";

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
  const [toggle, setToggle] = useState<Boolean>(true)

  const name = useSelector((state) => state.user.value.name);
  const token = useSelector((state) => state.user.value.name);

  const getList = async () => {
    await fetch(`http://localhost:3000/users/get/${token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setListFetched(data);
        console.log(listFetched);
      });
  };

  const activateToggle = () =>{
    setToggle(!toggle)
    console.log(toggle)
  }

  useEffect(() => {
    if(token !== null){
      getList();
    } 
  }, [toggle]);

  let title;

  if(name == null){
    title = (
      <h1>To do</h1>
    )
  } else {
    title = (
      <h1>{name}'s To do</h1>
    )
  }

  const listToRender = listFetched.map((data, i) => {
    return <ToDoCard key={i} {...data} />;
  });

  return (
    <div>
      <Login activateToggle={activateToggle}/>
      {title}
      {listToRender}
    </div>
  );
}
