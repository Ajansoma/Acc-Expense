import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import useCalc from '../../../hooks/useCalc';
import styles from './MainChart.module.css';

const labelData = [];
for (let i = 0; i < 32; i++) {
  labelData.push(i);
}

const MainChart = function () {
  const { lastMonthRevenue, currentRevenue, revenueDif } = useCalc();

  const data =
    lastMonthRevenue === 0 || currentRevenue === 0 || revenueDif === 0
      ? [100, 200, 40]
      : [lastMonthRevenue, currentRevenue, revenueDif];

  const [userData] = useState({
    labels: ['lastMonthRevenue', 'currentRevenue', 'revenueDifference'],
    datasets: [
      {
        label: 'My First Dataset',
        data: data,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
      },
    ],
  });

  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        <Pie data={userData} />
      </div>
    </div>
  );
};
export default MainChart;
