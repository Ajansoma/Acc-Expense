import useCalc from "../../../hooks/useCalc";
import styles from "./GrossProfitReport.module.css";

const ProfitOrLossReport = function () {
  const {
    formattedAmount,
    formattedCost,
    formattedProfitOrLoss,
    displayProfitOrLoss,
  } = useCalc();

  return (
    <div className={styles.container}>
      <div className={styles.title}>Gross {displayProfitOrLoss}</div>
      <div className={styles.earnings}>
        <ion-icon name="card-outline"></ion-icon>
        <div className={styles["amount"]}>
          <div className={styles["amount-title"]}>Total Earnings</div>
          <div className={styles.figures}>GHS {formattedAmount}</div>
        </div>
      </div>
      <div className={styles.expenses}>
        <ion-icon name="stats-chart-outline"></ion-icon>
        <div className={styles["expense-amount"]}>
          <div className={styles["amount-title"]}>Total Cost</div>
          <div className={styles.figures}>GHS {formattedCost}</div>
        </div>
      </div>
      <div className={styles["profit-loss"]}>
        <ion-icon name="pulse-outline"></ion-icon>
        <div className={styles.profit}>
          <div className={styles["amount-title"]}>
            Gross {displayProfitOrLoss}
          </div>
          <div className={styles.figures}>GHS {formattedProfitOrLoss}</div>
        </div>
      </div>
    </div>
  );
};
export default ProfitOrLossReport;
