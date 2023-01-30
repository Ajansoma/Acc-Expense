import React, { useState } from "react";

export const OrderContext = React.createContext({
  orders: [],
  expenses: [],
  orderHandler: () => {},
  expensesHandler: () => {},
});

//lOCAL STORAGE
const getStorage = localStorage.getItem("orders");
const storageData = getStorage ? JSON.parse(getStorage) : [];
const getExpenses = localStorage.getItem("expenses");
const storedExpenses = getExpenses ? JSON.parse(getExpenses) : [];

const OrderProvider = function (props) {
  const [orders, setOrder] = useState(storageData);
  const [expenses, setExpenses] = useState(storedExpenses);

  const changeOrderHandler = function (order) {
    setOrder(order);
  };

  const expensesHandler = function (expenses) {
    setExpenses(expenses);
  };

  const contextValue = {
    orders: orders,
    expenses: expenses,
    orderHandler: changeOrderHandler,
    expensesHandler: expensesHandler,
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {props.children}
    </OrderContext.Provider>
  );
};
export default OrderProvider;
