import styles from "./SubmitOrder.module.css";
import useForm from "../store/use-form";
const SubmitOrder = function (props) {
  const {
    inputValue: inputName,
    isInputInvalid: isNameInvalid,
    changeInputHandler: changeNameHandler,
    resetInput: resetInputName,
    blurHandler: blurHandlerName,
    invalidFormValue: isFormNameInvalid,
  } = useForm((value) => value.trim() === "");
  const {
    inputValue: inputCity,
    isInputInvalid: isCityInvalid,
    changeInputHandler: changeCityHandler,
    resetInput: resetInputCity,
    blurHandler: blurHandlerCity,
    invalidFormValue: isFormCityInvalid,
  } = useForm((value) => value.trim() === "");
  const {
    inputValue: inputAddress,
    isInputInvalid: isAddressInvalid,
    changeInputHandler: changeAddressHandler,
    resetInput: resetInputAddress,
    blurHandler: blurHandlerAddress,
    invalidFormValue: isFormAddressInvalid,
  } = useForm((value) => value.trim() === "");
  const submitOrder = function (e) {
    e.preventDefault();
    if (isFormNameInvalid) {
      return;
    } else if (isFormCityInvalid) {
      return;
    } else if (isFormAddressInvalid) {
      return;
    }
    resetInputName();
    resetInputCity();
    resetInputAddress();

    props.onSubmitHandler({
      name: inputName,
      city: inputCity,
      address: inputAddress,
    });
  };
  const nameClasses = `${styles.control} ${
    !isNameInvalid ? "" : styles.invalid
  }`;
  const cityClasses = `${styles.control} ${
    !isCityInvalid ? "" : styles.invalid
  }`;
  const addressClasses = `${styles.control} ${
    !isAddressInvalid ? "" : styles.invalid
  }`;
  return (
    <form className={styles.form} onSubmit={submitOrder}>
      <div className={nameClasses}>
        <label htmlFor="name">Введіть ім'я</label>
        <input
          onChange={changeNameHandler}
          value={inputName}
          onBlur={blurHandlerName}
          type="text"
          id="name"
        ></input>
        {isNameInvalid && <p>Введіть будь ласка ім'я</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">Введіть Назву Міста</label>
        <input
          onChange={changeCityHandler}
          value={inputCity}
          onBlur={blurHandlerCity}
          type="text"
          id="city"
        ></input>
        {isCityInvalid && <p>Введіть будь ласка місто</p>}
      </div>
      <div className={addressClasses}>
        <label htmlFor="address">Введіть Адрес</label>
        <input
          onChange={changeAddressHandler}
          value={inputAddress}
          onBlur={blurHandlerAddress}
          type="text"
          id="address"
        ></input>
        {isAddressInvalid && <p>Введіть будь ласка адрес</p>}
      </div>
      <div className={styles.actions}>
        <button className={styles.submit}>Підтвердити Замовлення</button>
        <button type="button" onClick={props.modalHandler}>
          Відмінити
        </button>
      </div>
    </form>
  );
};
export default SubmitOrder;
