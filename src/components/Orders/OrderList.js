import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/use-form/useHttp";
import LoadingSpinner from "../../UI/LoadingSpinner";
import OrderItem from "./OrderItem";
import styles from "./OrderList.module.css";
import Pagination from "./Pagination";
import { OrderContext } from "../../order-context/order-context";
import OrdersHeader from "./OrdersHeader";
import SelectedOrder from "./SelectedOrder";

const OrderList = function () {
  const [selectedItem, setSelectedItem] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const orderCxt = useContext(OrderContext);
  const { isLoading, error, sendRequest } = useHttp();
  const orders = orderCxt.orders;

  useEffect(() => {
    const transformedSales = function (orders) {
      const loadedOrders = [];

      for (const orderKey in orders) {
        loadedOrders.push({
          id: orderKey,
          name: orders[orderKey].name,
          number: orders[orderKey].number,
          unit: orders[orderKey].unit,
          price: orders[orderKey].price,
          cost: orders[orderKey].cost,
          date: orders[orderKey].date,
        });
      }
      orderCxt.orderHandler(loadedOrders);
    };

    sendRequest(
      {
        url: `https://acc-app-3d7ab-default-rtdb.firebaseio.com/sales.json`,
        method: "DELETE",
      },
      transformedSales
    );
  }, [sendRequest]);

  //SET LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // PAGINATION
  const newPageHandler = function (newPage) {
    setCurrentPage(newPage);
  };
  const indexOfLastPage = currentPage * ordersPerPage;
  const indexOfFirstPage = indexOfLastPage - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstPage, indexOfLastPage);

  // SELECTED ORDERS
  const selectedOrderHandler = function (selectedOrder, isSelected) {
    if (isSelected) {
      setSelectedItem((prevState) => {
        const selected = [...prevState, selectedOrder];
        return selected;
      });
    } else {
      setSelectedItem((prevState) => {
        const removeItem = prevState.filter(
          (item) => item.id !== selectedOrder.id
        );
        return removeItem;
      });
    }
  };

  //DELETE SELECTED ITEMS
  const deleteSelectedOrderHandler = function (isDeleted) {
    if (isDeleted) {
      orderCxt.orderHandler((prevState) => {
        const del = prevState.filter((order) => !selectedItem.includes(order));
        return del;
      });
      setSelectedItem([]);
    }
  };

  let orderList = (
    <div>
      {currentOrders.map((order) => (
        <OrderItem
          key={order.id}
          name={order.name}
          number={order.number}
          price={order.price}
          unit={order.unit}
          date={order.date}
          id={order.id}
          selectedOrder={selectedOrderHandler}
        />
      ))}
    </div>
  );
  if (isLoading) {
    orderList = (
      <div className={styles.spinner}>
        <LoadingSpinner />
      </div>
    );
  }

  if (orders.length === 0 && !isLoading && !error) {
    orderList = (
      <div className={styles["no-order"]}>
        <div className={styles.empty}>You don't have any customers yet.</div>
        <Link to="/order-form" className={styles["add-customer"]}>
          Add new Customers
        </Link>
      </div>
    );
  }

  if (!isLoading && error) {
    orderList = <div className={styles.error}>Sorry! something went wrong</div>;
  }

  let displaySelected = "";
  if (selectedItem.length > 0) {
    displaySelected = (
      <SelectedOrder
        selectedItem={selectedItem}
        deleteSelectedItem={deleteSelectedOrderHandler}
      />
    );
  }
  return (
    <div className={styles.container}>
      {displaySelected}
      <OrdersHeader />
      {orderList}
      <Pagination
        ordersPerPage={ordersPerPage}
        currentPage={currentPage}
        newPage={newPageHandler}
      />
    </div>
  );
};
export default OrderList;
