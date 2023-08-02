import React, { useState, useEffect, useCallback } from "react";
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
  const [toggle, setToggle] = useState<Boolean>(true);

  const name = useSelector((state) => state.user.value.name);
  const token = useSelector((state) => state.user.value.token);

  //fetch les todo de l'utilisateur
  const getList = async () => {
    await fetch(`http://localhost:3000/users/get/${token}`)
      .then((response) => response.json())
      .then((data) => {
        setListFetched(data.toDo);
        console.log(listFetched);
      });
  };

  //Toggle pour activer le useEffect lors de la connection/déconnection
  const activateToggle = useCallback(() => {
    setToggle((prevToggle) => !prevToggle);
  }, []);

  //Récupere les todo de l'utilisateur
  useEffect(() => {
    if (token !== null) {
      getList();
    }
  }, [activateToggle, token]);

  useEffect(() => {
    console.log("Toggle state changed:", toggle);
  }, [toggle]);
  let title;

  if (name == null) {
    title = <h1>To do</h1>;
  } else {
    title = <h1>{name}'s To do</h1>;
  }

  const listToRender = listFetched.map((data, i) => {
    return <ToDoCard key={i} {...data} />;
  });

  return (
    <div>
      <Login activateToggle={activateToggle} />
      {title}
      {listToRender}
    </div>
  );
}
