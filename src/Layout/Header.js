import React from "react";
import sushiImage from "../assets/sushi.jpg";
import AuthGoogle from "./AuthGoogle";
import styles from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";
const Header = function (props) {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>Япона Кухня</h1>
        <AuthGoogle></AuthGoogle>
        <HeaderCartButton modalHandler={props.modalHandler} />
      </header>
      <div className={styles["main-image"]}>
        <img src={sushiImage} alt="Блюда"></img>
      </div>
    </React.Fragment>
  );
};
export default Header;
