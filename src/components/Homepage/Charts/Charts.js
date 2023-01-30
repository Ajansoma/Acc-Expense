import styles from "./Charts.module.css";
import ExpensesChart from "./ExpensesChart";
import MainChart from "./MainChart";
import SalesChart from "./SalesChart";
const Charts = function () {
  return (
    <div className={styles.container}>
      <MainChart />
      <div className={styles.charts}>
        <ExpensesChart />
        <SalesChart />
      </div>
    </div>
  );
};
export default Charts;
