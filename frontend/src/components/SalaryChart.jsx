import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalaryChart = ({ stats }) => {
  const data = {
    labels: ['Salaire Total', 'Salaire Minimal', 'Salaire Maximal'],
    datasets: [{
      label: 'Montant en Ariary',
      data: [stats.total, stats.min, stats.max],
      backgroundColor: [
        'rgba(7, 137, 0, 0.7)',
        'rgba(7, 28, 213, 0.7)',
        'rgba(23, 44, 50, 0.7)'
      ],
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Répartition des salaires (Histogramme)',
        font: {
          size: 20
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${value} Ariary`
        }
      }
    }
  };

  return (
    <div className="salary-chart">
      <Bar data={data} options={options} />
    </div>
  );
};

export default SalaryChart;