import styles from './SalesChart.module.css';
import useCalc from '../../../hooks/useCalc';
const SalesChart = function () {
  const { monthlyOrders, previousOrders } = useCalc();

  const salesDif = monthlyOrders.length - previousOrders.length;
  const salesDifPercent =
    Math.round(
      (salesDif / (monthlyOrders.length + previousOrders.length)) * 100
    ) || 0;

  return (
    <div className={styles.container}>
      <div className={styles.sales}> Sales</div>
      <div className={styles['sales-figure']}>{salesDif}</div>
      <div className={styles['sales-change']}>
        <div>{salesDifPercent}%</div>
        <div className={styles.month}>this month</div>
      </div>
    </div>
  );
};
export default SalesChart;
