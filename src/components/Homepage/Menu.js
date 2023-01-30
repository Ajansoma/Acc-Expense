import { Link } from "react-router-dom";
import styles from "./Menu.module.css";

const Menu = function () {
  return (
    <div className={styles.container}>
      <ul>
        <div className={styles.home}>
          <div className={styles.title}>Home</div>
          <li>
            <Link className={styles["order-form"]} to="/">
              <ion-icon name="home-outline"></ion-icon>
              Home
            </Link>
          </li>
          <li>
            <Link className={styles["expense-form"]} to="/expense">
              <ion-icon name="pie-chart-outline"></ion-icon>
              Analytical
            </Link>
          </li>
        </div>

        <div className={styles.forms}>
          <div className={styles.title}>Forms</div>
          <li>
            <Link className={styles["order-form"]} to="/order-form">
              <ion-icon name="server-outline"></ion-icon>
              Orders
            </Link>
          </li>
          <li>
            <Link className={styles["expense-form"]} to="/expense">
              <ion-icon name="stats-chart-outline"></ion-icon>
              Expenses
            </Link>
          </li>
        </div>

        <div className={styles.apps}>
          <div className={styles.title}>Apps</div>
          <li>
            <Link className={styles.todo} to="/todo">
              <ion-icon name="list-outline"></ion-icon>
              Todo
            </Link>
          </li>
          <li>
            <Link className={styles.notes} to="/notes">
              <ion-icon name="albums-outline"></ion-icon>
              Note
            </Link>
          </li>
          <li>
            <Link className={styles.customers} to="/orders">
              <ion-icon name="people-outline"></ion-icon>
              Customers
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
};
export default Menu;
