import React, { useState, useEffect, useCallback } from "react";
import styles from "@/styles/Home.module.css";
import ToDoCard from "./ToDoCard";
import Login from "./Login";

import { useDispatch, useSelector } from "react-redux";
import SignUp from "./SignUp";

type Props = {};

export default function Home({}: Props) {
  interface listItem {
    data: {
      name: string;
      priority: number;
      done: boolean;
    };
  }

  //Nombres pour la notation de la priorité de la todo
  let options = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1000000];

  const [listFetched, setListFetched] = useState<listItem[]>([]);
  const [toggle, setToggle] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [signIn, setSignIn] = useState<boolean>(false);
  const [signUp, setSignUp] = useState<boolean>(false);
  const [todoName, setTodoName] = useState<string>("");
  const [todoPriority, setTodoPriority] = useState<number>(options[0]);

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
  }, [toggle, token]);

  useEffect(() => {
    console.log("Toggle state changed:", toggle);
  }, [toggle]);

  //Afficher le nom de l'utilisateur
  let title;

  if (name == null) {
    title = <h1>To do</h1>;
  } else {
    title = <h1>{name}'s To do</h1>;
  }

  const handleLogin = (status) => {
    setLoggedIn(status);
  };

  //Render les todos quand l'utilisateur est connecté
  let listToRender;

  if (loggedIn) {
    listToRender = listFetched.map((data, i) => {
      return <ToDoCard key={i} {...data} />;
    });
  } else {
    listToRender = <h2>Sign in to see and add todos</h2>;
  }

  //Afficher le signIn ou signUp

  const handleSignIn = () => {
    setSignIn(true);
  };

  const handleSignUp = () => {
    setSignUp(true);
  };

  const handleBack = () => {
    setSignIn(false);
    setSignUp(false);
  };

  //Affiche le contenu du header en fonction d'une connection ou inscription
  let headerContent;

  if (signIn === true) {
    headerContent = (
      <Login
        activateToggle={activateToggle}
        handleLogin={handleLogin}
        handleBack={handleBack}
      />
    );
  } else if (signUp === true) {
    headerContent = (
      <SignUp
        activateToggle={activateToggle}
        handleLogin={handleLogin}
        handleBack={handleBack}
      />
    );
  } else {
    headerContent = (
      <div>
        <button onClick={() => handleSignIn()}>Sign In</button>
        <button onClick={() => handleSignUp()}>Sign Up</button>
      </div>
    );
  }

  //Ajouter une todo
  const addTodo = () => {
    fetch(`http://localhost:3000/users/add/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: todoName, priority: todoPriority }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTodoName("");
        setTodoPriority(options[0]);
        activateToggle();
      });
  };

  //Supprimer Todo

  //Afficher l'input ajouter todo si l'utilisateur est connecté
  let addTodoInput;

  if (loggedIn) {
    addTodoInput = (
      <div>
        <input
          type="text"
          placeholder="To do to add"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
        ></input>
        <select
          value={todoPriority}
          onChange={(e) => setTodoPriority(e.target.value)}
        >
          {options.map((value) => {
            return (
              <option value={value} key={value}>
                {value}
              </option>
            );
          })}
        </select>
        <button onClick={addTodo}>Add</button>
      </div>
    );
  } else {
    addTodoInput = <div></div>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>{headerContent}</div>
      {title}
      {addTodoInput}
      {listToRender}
    </div>
  );
}
