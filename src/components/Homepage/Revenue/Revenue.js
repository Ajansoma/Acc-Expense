import MonthlyRevenue from "./MonthlyRevenue";
import MonthlySales from "./MonthlySales";
import RevenueChange from "./RevenueChange";
import styles from "./Revenue.module.css";

const Revenue = function () {
  return (
    <div className={styles.container}>
      <RevenueChange />
      <MonthlySales />
      <MonthlyRevenue />
    </div>
  );
};
export default Revenue;
