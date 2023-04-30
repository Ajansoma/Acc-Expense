import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/use-form/useHttp";
import LoadingSpinner from "../../UI/LoadingSpinner";
import OrderItem from "./OrderItem";
import styles from "./OrderList.module.css";
import Pagination from "./Pagination";
import { OrderContext } from "../../Store/order-context";
import OrdersHeader from "./OrdersHeader";
import { db } from "../../firebase";
import { collection, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import useOrder from "../../hooks/useOrder";

const OrderList = function () {
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const orderCxt = useContext(OrderContext);
  const { isLoading, error, sendRequest } = useHttp();
  const orders = orderCxt.orders;
  const { dateHandler, currentDate } = useOrder();
  const currentMonthOrders = dateHandler(orders, currentDate);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "orders"),
      (doc) => {
        let loadedOrders = [];
        doc.docs.forEach((doc) => {
          loadedOrders.push({ id: doc.id, ...doc.data() });
        });
        orderCxt.orderHandler(loadedOrders);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

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
  const currentOrders = currentMonthOrders.slice(
    indexOfFirstPage,
    indexOfLastPage
  );

  // DELETE ORDERS
  const selectedOrderHandler = async function (selectedOrder) {
    try {
      await deleteDoc(doc(db, "orders", selectedOrder.id));
    } catch (err) {
      console.log(err);
    }
    orderCxt.orderHandler((prevState) => {
      return prevState.filter((order) => selectedOrder.id !== order.id);
    });
  };

  let orderList = (
    <div>
      {currentOrders.map((order) => (
        <OrderItem
          key={order.id}
          name={order.customerName}
          number={order.customerNumber}
          price={order.costPrice}
          unit={order.unitName}
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

  return (
    <div className={styles.container}>
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
