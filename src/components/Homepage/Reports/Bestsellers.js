import useCalc from "../../../hooks/useCalc";
import styles from "./Bestsellers.module.css";

const Bestsellers = function () {
  const { monthlyOrders } = useCalc();

  const bestSellers = monthlyOrders.reduce((cur, { unit }) => {
    cur[unit] = cur[unit] || { unit, occurences: 0 };
    cur[unit].occurences++;
    return cur;
  }, {});

  const top3 = Object.values(bestSellers)
    .sort((a, b) => b.occurences - a.occurences)
    .slice(0, 3);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Bestsellers</div>
      <div className={styles["number-1"]}>
        <ion-icon name="trophy-outline"></ion-icon>
        <div className={styles["first-place"]}>
          <div className={styles["place-title"]}>{top3[0].unit} unit </div>
          <div className={styles.figures}>{top3[0].occurences} sold</div>
        </div>
      </div>
      <div className={styles["number-2"]}>
        <ion-icon name="medal-outline"></ion-icon>
        <div className={styles["second-place"]}>
          <div className={styles["place-title"]}>{top3[1].unit} unit</div>
          <div className={styles.figures}>{top3[1].occurences} sold</div>
        </div>
      </div>
      <div className={styles["number-3"]}>
        <ion-icon name="ribbon-outline"></ion-icon>
        <div className={styles["third-place"]}>
          <div className={styles["place-title"]}>{top3[2].unit} unit</div>
          <div className={styles.figures}>{top3[2].occurences} sold</div>
        </div>
      </div>
    </div>
  );
};
export default Bestsellers;
