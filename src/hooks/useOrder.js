import { useContext } from "react";
import { OrderContext } from "../Store/order-context";

const useOrder = function () {
  const orderCxt = useContext(OrderContext);
  const orders = orderCxt.orders;
  const expenses = orderCxt.expenses;

  //dates
  const now = new Date();
  const options = {
    month: "numeric",
    year: "numeric",
  };
  const currentDate = new Intl.DateTimeFormat("en-GB", options).format(now);

  const current = new Date();
  current.setMonth(current.getMonth() - 1);
  const previousDate = new Intl.DateTimeFormat("en-GB", options).format(
    current
  );

  //funtions
  const dateHandler = function (orders, dateData) {
    const monthlyData = orders.filter((order) => {
      const date = new Date(order.date);
      const orderDate = new Intl.DateTimeFormat("en-GB", options).format(date);
      return orderDate === dateData;
    });
    return monthlyData;
  };

  const revenueCalc = function (orders) {
    return orders.reduce((cur, order) => {
      return cur + Number(order.sellingPrice);
    }, 0);
  };

  const costCalc = function (orders) {
    return orders.reduce((cur, order) => {
      return cur + Number(order.costPrice);
    }, 0);
  };

  const expensesCalc = function (expenses) {
    return expenses.reduce((cur, expense) => {
      return cur + Number(expense.totalExpenses);
    }, 0);
  };

  const formattedRevenue = function (amount) {
    return new Intl.NumberFormat("en-IN", {
      maximumSignificantDigits: 3,
    }).format(amount);
  };

  return {
    expenses,
    orders,
    currentDate,
    previousDate,
    dateHandler,
    revenueCalc,
    costCalc,
    expensesCalc,
    formattedRevenue,
  };
};
export default useOrder;
