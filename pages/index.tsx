import styles from 'styles/Home.module.css'
import dynamic from "next/dynamic";
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  PointElement,
  CategoryScale,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend
);

const dayMap: any = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

const getPastWeekDays = () => {
  const today = new Date();
  const pastWeekDays = [];

  for (let i = 0; i < 7; i++) {
    const pastDay = new Date(today);
    pastDay.setDate(today.getDate() - i);
    pastWeekDays.unshift(dayMap[pastDay.getDay()]);
  }

  return pastWeekDays;
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Average Water temperature in the past week',
    },
  },
};

  export const data = {
    labels: getPastWeekDays(),
    datasets: [
      {
        label: 'Temperature',
        data: [28, 29, 31, 30, 32, 28, 29],
        
        borderColor: '#0099cc',
        fill: true,
        backgroundColor: 'rgba(102, 204, 255, 0.2)',
        tension: 0.43,
      },

    ]
  };

const Home = () => {

  return (
    <>
      <Line data={data} options={options}></Line>
    </>
      )
  }

export default dynamic(() => Promise.resolve(Home), { ssr: false });
