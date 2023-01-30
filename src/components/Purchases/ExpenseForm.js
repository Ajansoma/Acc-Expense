import { useState } from "react";
import useForm from "../../hooks/use-form/useForm";
import useHttp from "../../hooks/use-form/useHttp";
import styles from "./ExpenseForm.module.css";
import LoadingSpinner from "../../UI/LoadingSpinner";

const ExpenseForm = function (props) {
  //states
  const { isLoading, sendRequest } = useHttp();
  const [invalidForm, setInvalidForm] = useState("");

  //using custom forms
  const {
    enteredInput: adExpenses,
    inputIsValid: adExpensesIsValid,
    inputIsInvalid: adExpenseIsInvalid,
    inputBlurHandler: adExpensesBlurHandler,
    inputHandler: adExpensesHandler,
    reset: adExpenseReset,
  } = useForm((enteredInput) => enteredInput !== "");

  const {
    enteredInput: otherExpenses,
    inputIsValid: otherExpensesIsValid,
    inputIsInvalid: otherExpensesIsInvalid,
    inputBlurHandler: otherExpensesBlurHandler,
    inputHandler: otherExpensesHandler,
    reset: otherExpensesReset,
  } = useForm((enteredInput) => enteredInput !== "");

  const {
    inputBlurHandler: totalExpensesBlurHandler,
    inputHandler: totalExpensesHandler,
    reset: totalExpensesReset,
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
  if (adExpensesIsValid && otherExpensesIsValid && dateIsValid) {
    formIsValid = true;
  }

  //reseting forms
  const reset = function () {
    adExpenseReset() &&
      otherExpensesReset() &&
      totalExpensesReset() &&
      dateReset();
  };

  const cancelHandler = function () {
    reset();
  };

  const createCustomerList = function (orders, expenseData) {
    const generatedId = expenseData.name;
    const generatedData = {
      id: generatedId,
      totalExpenses: orders.totalExpenses,
      date: orders.date,
    };
    props.onAddExpenseData(generatedData);
  };

  const focusHandler = function () {
    setInvalidForm("");
  };

  //submitting the form
  const submitFormHandler = function (e) {
    e.preventDefault();

    const data = {
      adExpense: adExpenses,
      otherExpenses: otherExpenses,
      totalExpenses: +adExpenses + +otherExpenses,
      date: enteredDate,
    };

    const options = {
      url: `https://acc-app-3d7ab-default-rtdb.firebaseio.com/expenses.json`,
      method: "POST",
      body: data,
      headers: { "Content-Type": "application/json" },
    };

    if (formIsValid) {
      sendRequest(options, createCustomerList.bind(null, data));
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
        <p>Expenses form</p>
      </div>
      <div className={styles["customer-name"]}>
        <label>Ad Expenses</label>
        <input
          type="number"
          onChange={adExpensesHandler}
          onBlur={adExpensesBlurHandler}
          value={adExpenses}
        />
        {adExpenseIsInvalid && (
          <p className={styles.invalid}>Entered a Valid Number</p>
        )}
      </div>

      <div className={styles["customer-number"]}>
        <label>Other Expenses</label>
        <input
          type="number"
          onChange={otherExpensesHandler}
          onBlur={otherExpensesBlurHandler}
          value={otherExpenses}
        />
        {otherExpensesIsInvalid && (
          <p className={styles.invalid}>Entered a Valid Number</p>
        )}
      </div>

      <div className={styles["product-name"]}>
        <label>Total Expenses</label>
        <input
          type="number"
          onChange={totalExpensesHandler}
          onBlur={totalExpensesBlurHandler}
          value={+adExpenses + +otherExpenses}
        />
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
export default ExpenseForm;
