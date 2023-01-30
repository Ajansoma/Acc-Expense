import { useState, useContext } from "react";
import { OrderContext } from "../../order-context/order-context";
import styles from "./Pagination.module.css";

const Pagination = function (props) {
  const orderCxt = useContext(OrderContext);
  const orders = orderCxt.orders;

  const numPages = Math.ceil(orders.length / props.ordersPerPage);
  let currentPage = props.currentPage;
  const pages = (
    <div className={styles["pages-left"]}>{`${currentPage}/${numPages}`}</div>
  );

  let button;
  const nextBtn = (
    <button className={styles["btn-1"]} type="submit" id="btn-1">
      Page {currentPage + 1}
      <ion-icon name="arrow-forward-outline"></ion-icon>
    </button>
  );

  const prevBtn = (
    <button className={styles["btn-2"]} id="btn-2">
      <ion-icon name="arrow-back-outline"></ion-icon>
      Page {currentPage - 1}
    </button>
  );

  const bothBtn = (
    <div className={styles["other-pages"]} type="submit">
      {prevBtn}
      {pages}
      {nextBtn}
    </div>
  );

  //page 1 and other pages
  if (currentPage === 1 && numPages > 1) {
    button = nextBtn;
  }

  //other page
  if (currentPage < numPages && currentPage > 1) {
    button = bothBtn;
  }

  //last page
  if (currentPage === numPages) {
    button = prevBtn;
  }

  //only one page
  if (currentPage === 1 && numPages === 1) {
    button = "";
  }

  const changePageHandler = function (e) {
    const btn = e.target.id;
    if (btn === "btn-1" && currentPage > 0) {
      currentPage++;
    }
    if (btn === "btn-2" && currentPage > 0) {
      currentPage--;
    }
    props.newPage(currentPage);
  };

  return (
    <div className={styles.container}>
      <div className={styles.button} onClick={changePageHandler}>
        {button}
      </div>
    </div>
  );
};
export default Pagination;
