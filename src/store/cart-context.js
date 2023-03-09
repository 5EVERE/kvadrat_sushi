import React from "react";
import { useReducer } from "react";
const CartContext = React.createContext({});

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartContextReducer = function (state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const itemIndex = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });
    const existingItem = state.items[itemIndex];
    let updatedItem;
    let updatedItems;
    if (existingItem) {
      updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[itemIndex] = updatedItem;
    } else {
      updatedItem = {
        ...action.item,
      };
      updatedItems = state.items.concat(updatedItem);
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    const itemIndex = state.items.findIndex((item) => {
      return item.id === action.id;
    });
    const existingItem = state.items[itemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItem;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => {
        return item.id !== action.id;
      });
    } else {
      updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[itemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "RESET_ITEM") {
    return defaultCartState;
  }
  return defaultCartState;
};

export const CartContextProvider = function (props) {
  const [currentState, dispatchState] = useReducer(
    cartContextReducer,
    defaultCartState
  );
  const addItemHandler = function (item) {
    dispatchState({
      type: "ADD_ITEM",
      item: item,
    });
  };
  const removeItemHandler = function (id) {
    dispatchState({
      type: "REMOVE_ITEM",
      id: id,
    });
  };
  const resetItemHandler = function () {
    dispatchState({
      type: "RESET_ITEM",
    });
  };
  const cartContext = {
    items: currentState.items,
    totalAmount: currentState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    resetItem: resetItemHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
