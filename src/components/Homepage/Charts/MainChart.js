import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import useCalc from "../../../hooks/useCalc";
import styles from "./MainChart.module.css";

const labelData = [];
for (let i = 0; i < 32; i++) {
  labelData.push(i);
}

const MainChart = function () {
  const { monthlyOrders } = useCalc();
  const [userData] = useState({
    labels: [...labelData],
    datasets: [
      {
        label: "Sales",
        data: monthlyOrders.map((data) => data.price),
        backgroundColor: ["#3599e3"],
        borderColor: ["#3599e3"],
        display: false,
      },
    ],
  });

  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        <Line data={userData} />
      </div>
    </div>
  );
};
export default MainChart;
