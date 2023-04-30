import { useEffect, useContext, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import { OrderContext } from "../../Store/order-context";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const Expenses = function () {
  const orderCxt = useContext(OrderContext);
  const expenses = orderCxt.expenses;

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "expenses"),
      (doc) => {
        let loadedExpenses = [];
        doc.docs.forEach((doc) => {
          loadedExpenses.push({ id: doc.id, ...doc.data() });
        });
        orderCxt.expensesHandler(loadedExpenses);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    //local storage
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  return <ExpenseForm />;
};
export default Expenses;
