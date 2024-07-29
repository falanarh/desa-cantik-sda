import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, Title, ArcElement } from 'chart.js';

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DonutChart = ({ data }) => {
  const chartData = {
    labels: ['UMKM', 'Other'],
    datasets: [
      {
        label: 'UMKM Data',
        data: [data.umkm, data.other],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverOffset: 4,
      },
    ],
  };

  return <Doughnut data={chartData} />;
};

export default DonutChart; // Exporting DonutChart here
