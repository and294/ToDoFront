import React, {useState} from 'react'
import Link from 'next/link';
import { useDispatch, useSelector } from "react-redux";
import { signInToStore, logoutFromStore } from "@/reducers/user";
import styles from "@/styles/SignUp.module.css";

type Props = {};

export default function SignUp(props) {
  const [userName, setUserName] = useState<String>();
  const [email, setEmail] = useState<String>();
  const [password, setPassword] = useState<String>();
  const [repeat, setRepeat] = useState<String>();
  const [showInputs, setShowInputs] = useState<Boolean>(true);
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [errorMsg, setErrorMsg] = useState<String>();

  const dispatch = useDispatch();

  //Inscription
  const signUp = () => {
    if (password === repeat) {
      fetch("http://localhost:3000/users/signUp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result == true) {
            setShowInputs(false);
            dispatch(signInToStore({ token: data.token, name: data.name }));
            props.activateToggle();
            props.handleLogin(true);
          } else {
            setErrorMsg(data.error);
            setShowModal(true);
          }
        });
    }
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
  let signedUp;

  if (showInputs === true) {
    signedUp = (
      <div>
        <h1>SignUp</h1>
        <input
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          placeholder="Repeat password"
          onChange={(e) => setRepeat(e.target.value)}
          value={repeat}
        />
        <button onClick={() => signUp()}>Sign up !</button>
        <button onClick={() => props.handleBack()}>Back</button>
      </div>
    );
  } else {
    signedUp = (
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
      {signedUp}
      {modal}
    </div>
  );
}