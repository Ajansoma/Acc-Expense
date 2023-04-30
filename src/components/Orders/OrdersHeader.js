import styles from "./OrdersHeader.module.css";

const OrdersHeader = function () {
  return (
    <header className={styles.header}>
      <div>Customer</div>
      <div>Unit Name</div>
      <div>Price</div>
      <div>Date</div>
      <div>Delete Order</div>
    </header>
  );
};
export default OrdersHeader;
