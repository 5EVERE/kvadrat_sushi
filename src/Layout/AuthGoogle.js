import AuthModal from "./AuthModal";
import { useState, useEffect } from "react";
import styles from "./AuthGoogle.module.css";
import { gapi } from "gapi-script";
const AuthGoogle = function (props) {
  const [stateName, setStateName] = useState(null);
  const [state, setState] = useState(false);
  const [modal, setModal] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  gapi.load("auth2", function () {
    gapi.auth2
      .init({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      })
      .then(
        () => console.log("init OK"),
        () => {
          console.log("init ERR");
        }
      );
  });
  const signIn = function () {
    const _authOk = (user) => {
      setStateName(user.getBasicProfile().getEmail());
      setImgUrl(user.getBasicProfile().getImageUrl());
      setState(true);
      localStorage.setItem("isLog", "1");
    };
    const _authErr = () => {
      console.log("auth Err");
    };
    const GoogleAuth = gapi.auth2.getAuthInstance();
    GoogleAuth.signIn({
      scope: "profile email",
    }).then(_authOk, _authErr);
  };
  const signOut = function () {
    const GoogleAuth = gapi.auth2.getAuthInstance();
    GoogleAuth.signOut().then(
      () => {
        setModal(false);
        setState(false);
        setStateName(null);
        localStorage.removeItem("isLog");
      },
      () => console.log("signOut Err")
    );
  };
  const modalAuth = function () {
    setModal(!modal);
  };
  return (
    <div className={styles["auth-google"]}>
      {!state && (
        <button onClick={signIn} className={styles.button}>
          Login
        </button>
      )}
      {state && (
        <button onClick={modalAuth} className={styles.button}>
          Profile
        </button>
      )}
      {modal && (
        <AuthModal img={imgUrl} email={stateName} onLogout={signOut} onClose={modalAuth} />
      )}
    </div>
  );
};
export default AuthGoogle;
