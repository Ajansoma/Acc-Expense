import { useState, useContext } from "react";
import { OrderContext } from "../../Store/order-context";
import styles from "./OrderItem.module.css";

const OrderItem = function (props) {
  const { name, number, unit, price, date } = props;
  const priceEdited = `GHS ${price}`;
  const orderCxt = useContext(OrderContext);
  const orders = orderCxt.orders;

  const selectItemHandler = function () {
    const index = orders.findIndex((order) => order.id === props.id);
    const selectedItem = orders[index];
    props.selectedOrder(selectedItem);

    <div>Are you sure you want to delete this Order</div>;
  };

  return (
    <div className={styles.list}>
      <div className={styles.contact}>
        <div className={styles["personal-info"]}>
          {/* <div className={styles.checkbox}>
            <input type="checkbox" id="check" />
            <label htmlFor="check"></label>
          </div> */}
          <div>
            <div className={styles.name}>{name}</div>
            <div className={styles.number}>{number}</div>
          </div>
        </div>
      </div>
      <div className={styles.unit}>{unit}</div>
      <div className={styles.price}>{priceEdited}</div>
      <div className={styles.date}>{date}</div>
      <div>
        <ion-icon name="trash-outline" onClick={selectItemHandler}></ion-icon>
      </div>
    </div>
  );
};
export default OrderItem;
