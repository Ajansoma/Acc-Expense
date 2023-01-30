import Bestsellers from "./Bestsellers";
import ProfitOrLossReport from "./GrossProfitReport";
import NetProfitLoss from "./NetProfitLoss";
import styles from "./Reports.module.css";

const Report = function () {
  return (
    <div className={styles.container}>
      <ProfitOrLossReport />
      <NetProfitLoss />
      <Bestsellers />
    </div>
  );
};
export default Report;
