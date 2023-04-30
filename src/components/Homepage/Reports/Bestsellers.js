import useCalc from '../../../hooks/useCalc';
import styles from './Bestsellers.module.css';

const Bestsellers = function () {
  const { monthlyOrders } = useCalc();

  const bestSellers = monthlyOrders.reduce((cur, { unitName }) => {
    cur[unitName] = cur[unitName] || { unitName, occurences: 0 };
    cur[unitName].occurences++;
    return cur;
  }, {});

  const top3 = Object.values(bestSellers)
    .sort((a, b) => b.occurences - a.occurences)
    .slice(0, 3);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Bestsellers</div>
      <div className={styles['number-1']}>
        <ion-icon name="trophy-outline"></ion-icon>
        <div className={styles['first-place']}>
          <div className={styles['place-title']}>{top3[0]?.unitName} unit </div>
          <div className={styles.figures}>{top3[0]?.occurences || 0} sold</div>
        </div>
      </div>
      <div className={styles['number-2']}>
        <ion-icon name="medal-outline"></ion-icon>
        <div className={styles['second-place']}>
          <div className={styles['place-title']}>{top3[1]?.unitName} unit</div>
          <div className={styles.figures}>{top3[1]?.occurences || 0} sold</div>
        </div>
      </div>
      <div className={styles['number-3']}>
        <ion-icon name="ribbon-outline"></ion-icon>
        <div className={styles['third-place']}>
          <div className={styles['place-title']}>{top3[2]?.unitName} unit</div>
          <div className={styles.figures}>{top3[2]?.occurences || 0} sold</div>
        </div>
      </div>
    </div>
  );
};
export default Bestsellers;
