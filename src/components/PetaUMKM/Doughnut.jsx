import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, Title, ArcElement } from 'chart.js';

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const DonutChart = ({ data }) => {
  const chartData = {
    labels: ['UMKM', 'Other'],
    datasets: [
      {
        label: 'UMKM Data',
        data: [data.umkm, data.other],
        backgroundColor: ['#315493', '#8FA2D4'],
        hoverOffset: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: true, // Enable tooltips
      },
    },
  };

  return <Doughnut data={chartData} options={chartOptions} />;
};

export default DonutChart;
