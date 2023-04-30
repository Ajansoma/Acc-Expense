import styles from "./ExpensesChart.module.css";
import useCalc from "../../../hooks/useCalc";
const ExpensesChart = function () {
  const { formattedExpensesDif, expenseDif, totalExpenses } = useCalc();
  const changePercent = Math.round((expenseDif / totalExpenses) * 100) || 0;
  const posNeg = expenseDif >= 0 ? "+" : "-";

  return (
    <div className={styles.container}>
      <div className={styles.sales}> Expenses</div>
      <div className={styles["expenses-figure"]}>
        GHS {formattedExpensesDif}
      </div>
      <div className={styles["expenses-change"]}>
        <div>
          {posNeg}
          {changePercent}%
        </div>
        <div className={styles.month}>this month</div>
      </div>
    </div>
  );
};
export default ExpensesChart;
