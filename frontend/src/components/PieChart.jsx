import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Enregistrez les composants nécessaires de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  // Préparer les données pour le diagramme camembert
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.values,
        backgroundColor: [
          '#36A2EB', // Bleu
          '#FF6384', // Rose
          '#FFCE56', // Jaune
          '#4BC0C0', // Turquoise
          '#9966FF', // Violet
        ],
        hoverBackgroundColor: [
          '#36A2EB',
          '#FF6384',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;