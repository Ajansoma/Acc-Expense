import OrderList from "./OrderList";
import styles from "./Order.module.css";

const Order = function () {
  return (
    <div className={styles.container}>
      <div className={styles["customers-list"]}>Customers List</div>
      <OrderList />
    </div>
  );
};
export default Order;
