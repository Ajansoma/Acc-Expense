import { useState } from "react";
import useForm from "../hooks/use-form/useForm";
import useHttp from "../hooks/use-form/useHttp";
import styles from "./Input.module.css";
import LoadingSpinner from "./LoadingSpinner";

const Input = function () {
  const [invalidForm, setInvalidForm] = useState("");
  const {
    enteredInput: customerName,
    inputIsValid: customerNameIsValid,
    inputIsInvalid: customerNameIsInvalid,
    inputBlurHandler: customerBlurHandler,
    inputHandler: customerNameHandler,
    reset: customerNameReset,
  } = useForm((enteredInput) => enteredInput !== "");

  const {
    enteredInput: customerNumber,
    inputIsValid: customerNumberIsValid,
    inputIsInvalid: customerNumberIsInvalid,
    inputBlurHandler: customerNumberBlurHandler,
    inputHandler: customerNumberHandler,
    reset: customerNumberReset,
  } = useForm(
    (enteredInput) => enteredInput !== "" && enteredInput.length === 10
  );

  const {
    enteredInput: unitName,
    inputIsValid: unitNameIsValid,
    inputIsInvalid: unitNameIsInvalid,
    inputBlurHandler: unitBlurHandler,
    inputHandler: unitNameHandler,
    reset: unitNameReset,
  } = useForm((enteredInput) => enteredInput !== "");

  const {
    enteredInput: sellingPrice,
    inputIsValid: sellingPriceIsValid,
    inputIsInvalid: sellingPriceIsInvalid,
    inputBlurHandler: sellingPriceBlurHandler,
    inputHandler: sellingPriceHandler,
    reset: sellingPriceReset,
  } = useForm((enteredInput) => enteredInput !== "");

  const {
    enteredInput: costPrice,
    inputIsValid: costPriceIsValid,
    inputIsInvalid: costPriceIsInvalid,
    inputBlurHandler: costPriceBlurHandler,
    inputHandler: costPriceHandler,
    reset: costPriceReset,
  } = useForm((enteredInput) => enteredInput !== "");

  const {
    enteredInput: enteredDate,
    inputIsValid: dateIsValid,
    inputIsInvalid: dateIsInvalid,
    inputBlurHandler: dateBlurHandler,
    inputHandler: dateHandler,
    reset: dateReset,
  } = useForm((enteredInput) => enteredInput !== "");

  let formIsValid = false;

  if (
    customerNameIsValid &&
    customerNumberIsValid &&
    unitNameIsValid &&
    sellingPriceIsValid &&
    costPriceIsValid &&
    dateIsValid
  ) {
    formIsValid = true;
  }

  const reset = function () {
    customerNameReset();
    customerNumberReset();
    unitNameReset();
    sellingPriceReset();
    costPriceReset();
    dateReset();
  };

  const cancelHandler = function () {
    reset();
  };

  const { isLoading, error, sendRequest } = useHttp();

  const createCustomerList = function (orders, customerData) {
    const generatedId = customerData.name;
    const generatedData = {
      id: generatedId,
      name: orders.name,
      number: orders.number,
      unit: orders.unit,
      price: orders.price,
      cost: orders.cost,
      date: orders.date,
    };
  };

  const focusHandler = function () {
    setInvalidForm("");
  };

  const submitFormHandler = function (e) {
    e.preventDefault();
    // reset();

    const data = {
      name: customerName,
      number: customerNumber,
      unit: unitName,
      price: sellingPrice,
      cost: costPrice,
      date: enteredDate,
    };

    const options = {
      url: `https://acc-app-3d7ab-default-rtdb.firebaseio.com/sales.json`,
      method: "POST",
      body: data,
      headers: { "Content-Type": "application/json" },
    };

    if (formIsValid) {
      sendRequest(options, createCustomerList.bind(null, data));
      reset();
    }
    if (!formIsValid) {
      setInvalidForm(
        <p className={styles.invalid}>Please ensure all Fields are completed</p>
      );
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={submitFormHandler}
      onFocus={focusHandler}
    >
      <div className={styles.sales}>
        <p>purchase form</p>
      </div>
      <div className={styles["customer-name"]}>
        <label>Customer Name</label>
        <input
          type="text"
          onChange={customerNameHandler}
          onBlur={customerBlurHandler}
          value={customerName}
        />
        {customerNameIsInvalid && (
          <p className={styles.invalid}>Field cannot be Empty</p>
        )}
      </div>

      <div className={styles["customer-number"]}>
        <label>Customer Number</label>
        <input
          type="number"
          onChange={customerNumberHandler}
          onBlur={customerNumberBlurHandler}
          value={customerNumber}
        />
        {customerNumberIsInvalid && (
          <p className={styles.invalid}>Entered a Valid Phone Number</p>
        )}
      </div>

      <div className={styles["product-name"]}>
        <label>Unit Name</label>
        <input
          type="text"
          onChange={unitNameHandler}
          onBlur={unitBlurHandler}
          value={unitName}
        />
        {unitNameIsInvalid && (
          <p className={styles.invalid}>Field cannot be Empty</p>
        )}
      </div>

      <div className={styles["price"]}>
        <label>Selling Price</label>
        <input
          type="number"
          onChange={sellingPriceHandler}
          onBlur={sellingPriceBlurHandler}
          value={sellingPrice}
        />
        {sellingPriceIsInvalid && (
          <p className={styles.invalid}>Field cannot be Empty</p>
        )}
      </div>

      <div className={styles["cost-price"]}>
        <label>Cost Price</label>
        <input
          type="number"
          onChange={costPriceHandler}
          onBlur={costPriceBlurHandler}
          value={costPrice}
        />
        {costPriceIsInvalid && (
          <p className={styles.invalid}>Field cannot be Empty</p>
        )}
      </div>

      <div className={styles["cost-price"]}>
        <label>Date</label>
        <input
          type="date"
          onChange={dateHandler}
          onBlur={dateBlurHandler}
          value={enteredDate}
        />
        {dateIsInvalid && (
          <p className={styles.invalid}>Field cannot be Empty</p>
        )}
      </div>

      {isLoading && (
        <div className={styles.spinner}>
          <LoadingSpinner />
        </div>
      )}

      {invalidForm}
      <div className={styles.btn}>
        <button className={styles.cancel} type="button" onClick={cancelHandler}>
          cancel
        </button>
        <button className={styles.submit} type="submit">
          submit
        </button>
      </div>
    </form>
  );
};
export default Input;
