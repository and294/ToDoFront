import React, { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { signInToStore, logoutFromStore } from "@/reducers/user";

type Props = {};

export default function Login(props) {
  const [showInputs, setShowInputs] = useState<Boolean>(true);
  const [signInUsername, setSignInUsername] = useState<String>();
  const [signInPassword, setSignInPassword] = useState<String>();

  const dispatch = useDispatch();

  const signIn = () => {
    setShowInputs(false);
    fetch("http://localhost:3000/users/signIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: signInUsername, password: signInPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(signInToStore({token: data.token, name: data.name}));
        props.activateToggle(); // Move this inside the signIn function
      });
    setSignInUsername("");
    setSignInPassword("");
  };

  const signOut = () => {
    setShowInputs(true);
    dispatch(logoutFromStore())
    props.activateToggle();
  };

  let signedIn;
  if (showInputs === true) {
    signedIn = (
      <div>
        <input
          placeholder="Username"
          onChange={(e) => setSignInUsername(e.target.value)}
          value={signInUsername}
        />
        <input
          placeholder="Password"
          onChange={(e) => setSignInPassword(e.target.value)}
          value={signInPassword}
        />
        <button onClick={signIn}>Sign in</button>
        <Link href="/signUp">Sign Up</Link>
      </div>
    );
  } else {
    signedIn = (
      <div>
        <button onClick={signOut}>Logout</button>
      </div>
    );
  }

  return <div>{signedIn}</div>;
}
