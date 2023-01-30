import { useState, useContext } from "react";
import { OrderContext } from "../../order-context/order-context";
import styles from "./OrderItem.module.css";

const OrderItem = function (props) {
  const [isSelected, setIsSelected] = useState(true);
  const price = `GHS ${props.price}`;
  const orderCxt = useContext(OrderContext);
  const orders = orderCxt.orders;

  const selectItemHandler = function () {
    setIsSelected((prevState) => !prevState);
    const index = orders.findIndex((order) => order.id === props.id);
    const selectedItem = orders[index];
    props.selectedOrder(selectedItem, isSelected);
  };

  return (
    <div className={styles.list} onClick={selectItemHandler}>
      <div className={styles.contact}>
        <div className={styles["personal-info"]}>
          <div className={styles.checkbox}>
            <input type="checkbox" id="check" />
            <label htmlFor="check"></label>
          </div>
          <div>
            <div className={styles.name}>{props.name}</div>
            <div className={styles.number}>{props.number}</div>
          </div>
        </div>
      </div>
      <div className={styles.unit}>{props.unit}</div>
      <div className={styles.price}>{price}</div>
      <div className={styles.date}>{props.date}</div>
    </div>
  );
};
export default OrderItem;
