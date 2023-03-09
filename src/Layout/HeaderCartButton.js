import { useContext } from "react";
import { useState, useEffect } from "react";
import CartContext from "../store/cart-context";
import styles from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
const HeaderCartButton = function (props) {
  const [bump, setBump] = useState(false);
  const cartContext = useContext(CartContext);
  const cartContextNumber = cartContext.items.reduce((currentValue, item) => {
    return currentValue + item.amount;
  }, 0);
  useEffect(() => {
    if (cartContextNumber === 0) {
      return;
    }
    const timer = setTimeout(() => {
      setBump(false);
    }, 300);
    setBump(true);
    return () => {
      clearTimeout(timer);
    };
  }, [cartContextNumber]);
  const classesButton = `${styles.button} ${bump ? styles.bump : ""}`;
  return (
    <button onClick={props.modalHandler} className={classesButton}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Кошик</span>
      <span className={styles.badge}>{cartContextNumber}</span>
    </button>
  );
};
export default HeaderCartButton;
