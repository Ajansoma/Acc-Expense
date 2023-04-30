import useCalc from "../../../hooks/useCalc";
import styles from "./RevenueChange.module.css";

const RevenueChange = function () {
  const { formattedRevenueChange, revenueDif, changePercent } = useCalc();
  const revenuePercent = changePercent || 0;

  //stlying percentage container
  const percentStyle =
    revenueDif > 0
      ? `${styles.revenue}`
      : `${styles.revenue} ${styles["percent-change"]}`;

  let icon;
  if (revenueDif > 0) {
    icon = <ion-icon name="trending-up-outline"></ion-icon>;
  }
  if (revenueDif < 0) {
    icon = <ion-icon name="trending-down-outline"></ion-icon>;
  }

  return (
    <div className={styles.container}>
      <div className={styles["revenue-text"]}>
        <div>Revenue Analysis</div>
      </div>
      <div className={styles.numbers}>
        <div>GHS {formattedRevenueChange}</div>
      </div>
      <div className={percentStyle}>
        {icon}
        <div>{revenuePercent}%</div>
      </div>
    </div>
  );
};
export default RevenueChange;
