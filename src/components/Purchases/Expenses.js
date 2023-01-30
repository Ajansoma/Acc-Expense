import { useEffect, useContext, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import useHttp from "../../hooks/use-form/useHttp";
import { OrderContext } from "../../order-context/order-context";

const Expenses = function () {
  const { isLoading, error, sendRequest: getRequest } = useHttp();
  const orderCxt = useContext(OrderContext);
  const expenses = orderCxt.expenses;

  useEffect(() => {
    const transfromedExpensesData = function (data) {
      const loadedData = [];
      for (const expensesKey in data) {
        loadedData.push({
          id: expensesKey,
          expenses: data[expensesKey].totalExpenses,
          date: data[expensesKey].date,
        });
      }
      orderCxt.expensesHandler(loadedData);
    };

    getRequest(
      {
        url: "https://acc-app-3d7ab-default-rtdb.firebaseio.com/expenses.json",
      },
      transfromedExpensesData
    );

    //local storage
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [getRequest, , expenses]);

  return <ExpenseForm />;
};
export default Expenses;
