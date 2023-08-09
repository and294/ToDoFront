import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInToStore, logoutFromStore } from "@/reducers/user";
import styles from "@/styles/Login.module.css";

type Props = {};

export default function Login(props) {
  const [showInputs, setShowInputs] = useState<Boolean>(true);
  const [signInUsername, setSignInUsername] = useState<String>();
  const [signInPassword, setSignInPassword] = useState<String>();
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [errorMsg, setErrorMsg] = useState<String>();

  const dispatch = useDispatch();

  //Connection
  const signIn = () => {
    fetch("http://localhost:3000/users/signIn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: signInUsername, password: signInPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result === true) {
          dispatch(signInToStore({ token: data.token, name: data.name }));
          setShowInputs(false);
          props.activateToggle();
          props.handleLogin(true);
        } else {
          setErrorMsg(data.error);
          setShowModal(true);
        }
      });
    setSignInUsername("");
    setSignInPassword("");
  };

  //Déconnection
  const signOut = () => {
    setShowInputs(true);
    dispatch(logoutFromStore());
    props.activateToggle();
    props.handleLogin(false);
    props.handleBack();
  };

  //Affiche les inputs ou boutton de déconnection
  let signedIn;
  if (showInputs === true) {
    signedIn = (
      <div className={styles.main}>
        <div className={styles.inputsDiv}>
          <input
            placeholder="Username"
            onChange={(e) => setSignInUsername(e.target.value)}
            value={signInUsername}
            className={styles.inputs}
          />
          <input
            placeholder="Password"
            onChange={(e) => setSignInPassword(e.target.value)}
            value={signInPassword}
            className={styles.inputs}
          />
          <button onClick={signIn} className={styles.signInBtn}>
            Sign in
          </button>
          <button onClick={() => props.handleBack()}>Back</button>
        </div>
      </div>
    );
  } else {
    signedIn = (
      <div className={styles.main}>
        <button onClick={signOut} className={styles.signOutBtn}>
          SignOut
        </button>
      </div>
    );
  }

  //Modal affichant les erreurs
  const closeModal = () => {
    setShowModal(false);
  };

  let modal;

  if (showModal) {
    modal = (
      <div className={styles.modal}>
        {errorMsg}
        <button onClick={() => closeModal()}>Close</button>
      </div>
    );
  } else {
    <div className={styles.modalClosed}></div>;
  }

  return (
    <div>
      {signedIn}
      {modal}
    </div>
  );
}
