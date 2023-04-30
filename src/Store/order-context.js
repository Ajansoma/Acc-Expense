import React, { useState } from "react";

export const OrderContext = React.createContext({
  orders: [],
  expenses: [],
  notes: [],
  orderHandler: () => {},
  expensesHandler: () => {},
  notesHandler: () => {},
});

//lOCAL STORAGE
const getStorage = localStorage.getItem("orders");
const getExpenses = localStorage.getItem("expenses");
const getData = localStorage.getItem("notes");

const OrderProvider = function (props) {
  const [orders, setOrder] = useState(getStorage ? JSON.parse(getStorage) : []);
  const [expenses, setExpenses] = useState(
    getExpenses ? JSON.parse(getExpenses) : []
  );
  const [notes, setNotes] = useState(getData ? JSON.parse(getData) : []);

  const changeOrderHandler = function (order) {
    setOrder(order);
  };

  const expensesHandler = function (expenses) {
    setExpenses(expenses);
  };

  const notesHandler = function (notes) {
    setNotes(notes);
  };

  const contextValue = {
    orders: orders,
    expenses: expenses,
    notes: notes,
    orderHandler: changeOrderHandler,
    expensesHandler: expensesHandler,
    notesHandler: notesHandler,
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {props.children}
    </OrderContext.Provider>
  );
};
export default OrderProvider;
