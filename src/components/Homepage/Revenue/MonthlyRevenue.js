import useCalc from "../../../hooks/useCalc";
import styles from "./MonthlyRevenue.module.css";

const MonthlyRevenue = function () {
  const { formattedAmount } = useCalc();

  return (
    <div className={styles.container}>
      <div className={styles.earnings}>
        <div className={styles["total-earning"]}>
          <ion-icon name="cash-outline"></ion-icon>
          <div> Total Earnings</div>
        </div>
      </div>
      <div className={styles.revenue}>
        <div className={styles["revenue-numbers"]}>GHS {formattedAmount}</div>
        <div className={styles["revenue-text"]}>Monthly Revenue</div>
      </div>
    </div>
  );
};
export default MonthlyRevenue;
