import React, { useState } from "react";
import Header from "./Layout/Header";
import Meals from "./Meals/Meals";
import Cart from "./Cart/Cart";
import {CartContextProvider} from "./store/cart-context";
function App() {
  const [modal, setModal] = useState(false);
  const modalHandler = function () {
    setModal(!modal);
  };
  return (
    <CartContextProvider>
      {modal && <Cart modalHandler={modalHandler}/>}
      <Header modalHandler={modalHandler}/>
      <Meals />
    </CartContextProvider>
  );
}

export default App;
