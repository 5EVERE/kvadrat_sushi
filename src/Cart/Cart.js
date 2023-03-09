import CartContext from "../store/cart-context";
import React, { useState, useContext } from "react";
import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import SubmitOrder from "./SubmitOrder";
const Cart = function (props) {
  const [viewOrder, setViewOrder] = useState(false);
  const [orderIsSubmitting, setOrderIsSubmitting] = useState(false);
  const [orderIsSubmitted, setOrderIsSubmitted] = useState(false);
  const cartContext = useContext(CartContext);
  const totalAmount = `$${Math.abs(cartContext.totalAmount.toFixed(2))}`;
  const onAdd = function (item) {
    cartContext.addItem({ ...item, amount: 1 });
  };
  const onRemove = function (id) {
    cartContext.removeItem(id);
  };
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={onAdd.bind(null, item)}
          onRemove={onRemove.bind(null, item.id)}
        >
          {item.name}
        </CartItem>
      ))}
    </ul>
  );
  const addOrder = function () {
    setViewOrder(true);
  };
  const hasAmount = cartContext.items.length > 0;
  const modalButtons = (
    <div className={styles.actions}>
      <button onClick={props.modalHandler} className={styles["button--alt"]}>
        Закрити
      </button>
      {hasAmount && (
        <button onClick={addOrder} className={styles.button}>
          Замовити
        </button>
      )}
    </div>
  );
  const submitHandler = async function (userData) {
    setOrderIsSubmitting(true);
    await fetch(
      "https://react-http-6ffa9-default-rtdb.firebaseio.com/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedMeals: cartContext.items,
        }),
      }
    );
    setOrderIsSubmitting(false);
    setOrderIsSubmitted(true);
    cartContext.resetItem();
  };

  const modalWindow = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Загальна сума</span>
        <span>{totalAmount}</span>
      </div>
      {viewOrder && (
        <SubmitOrder
          onSubmitHandler={submitHandler}
          modalHandler={props.modalHandler}
        />
      )}
      {!viewOrder && modalButtons}
    </React.Fragment>
  );
  const submittingModalWindow = (
    <React.Fragment>
      <p>Відправка Ваших даних...</p>
    </React.Fragment>
  );
  const subtittedModalWindow = (
    <React.Fragment>
      <p>Ваше замовлення відправлено, чекайте дзвінка оператора!</p>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.modalHandler}>
          Закрити
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal modalHandler={props.modalHandler}>
      {!orderIsSubmitting && !orderIsSubmitted && modalWindow}
      {orderIsSubmitting && submittingModalWindow}
      {orderIsSubmitted && subtittedModalWindow}
    </Modal>
  );
};
export default Cart;
