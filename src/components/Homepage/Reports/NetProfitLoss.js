import useCalc from "../../../hooks/useCalc";
import styles from "./NetProfitLoss.module.css";

const NetProfitLoss = function () {
  const {
    formattedExpenses,
    formattedProfitOrLoss,
    displayProfitOrLoss,
    netFormattedProfitOrLoss,
    displayNetProfitOrLoss,
  } = useCalc();

  return (
    <div className={styles.container}>
      <div className={styles.title}>Net {displayProfitOrLoss}</div>
      <div className={styles.earnings}>
        <ion-icon name="card-outline"></ion-icon>
        <div className={styles["amount"]}>
          <div className={styles["amount-title"]}>
            Gross {displayProfitOrLoss}
          </div>
          <div className={styles.figures}>GHS {formattedProfitOrLoss}</div>
        </div>
      </div>
      <div className={styles.expenses}>
        <ion-icon name="stats-chart-outline"></ion-icon>
        <div className={styles["expense-amount"]}>
          <div className={styles["amount-title"]}>Expenses</div>
          <div className={styles.figures}>GHS {formattedExpenses}</div>
        </div>
      </div>
      <div className={styles["profit-loss"]}>
        <ion-icon name="pulse-outline"></ion-icon>
        <div className={styles.profit}>
          <div className={styles["amount-title"]}>
            Net {displayNetProfitOrLoss}
          </div>
          <div className={styles.figures}>GHS {netFormattedProfitOrLoss}</div>
        </div>
      </div>
    </div>
  );
};
export default NetProfitLoss;
