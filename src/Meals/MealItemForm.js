import {useRef} from "react";
import Input from "../UI/Input";
import styles from "./MealItemForm.module.css";
const MealItemForm = function (props) {
  const amountRef = useRef();
  const addItemSubmit = function(e){
    e.preventDefault();
    const amountValue = amountRef.current.value;
    if(+amountValue < 1){
      return;
    }
    props.onAddItem(+amountValue);
  }
  return (
    <form onSubmit={addItemSubmit} className={styles.form}>
      <Input
      ref={amountRef}
        label="Кількість"
        input={{
          id: props.id,
          type: "number",
          min: "1",
          step: "1",
          defaultValue: "1",
        }}
      ></Input>
      <button>Добавити</button>
    </form>
  );
};
export default MealItemForm;
