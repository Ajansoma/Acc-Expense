import useCalc from "../../../hooks/useCalc";
import styles from "./MonthlySales.module.css";

const MonthlySales = function () {
  const { monthlyOrders: monthSales } = useCalc();

  return (
    <div className={styles.container}>
      <div className={styles.purchases}>
        <ion-icon className={styles.icon} name="bag-outline"></ion-icon>
        <div>Purchases</div>
      </div>
      <div className={styles["sales-figure"]}>
        <div className={styles.sales}>{monthSales.length}</div>
        <div className={styles["monthly-sales"]}>Monthly Sales</div>
      </div>
    </div>
  );
};
export default MonthlySales;
