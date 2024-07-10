import { Bar, Pie } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LegendItem, Colors } from 'chart.js';
import { Chart as ChartJS, ArcElement} from 'chart.js';
import  {getChartData_company, getChartData_day, getStatus, getStaffBatch} from '@/utils/getStatistics';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.register(ArcElement, Tooltip, Legend);

interface BarChartProps {
  data: number[];
  labels: string[];
}

const BarChartAlltime: React.FC<{ parcels: any[] }> = ({ parcels }) => {
    const chartData = getChartData_day(parcels);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
    title: {
        display: true,
        text: 'Daily Parcel Intake'
    }
    }
  };

  return <Bar data={chartData} options={options} />;
};

const HorizontalBarChartCompany: React.FC<{ parcels: any[] }> = ({ parcels }) => {
    const chartData = getChartData_company(parcels);

    const options = {
      indexAxis: 'y' as const, // This will make the chart horizontal
      scales: {
        x: {
          beginAtZero: true,
        },
      },
      plugins: {
      title: {
          display: true,
          text: 'Parcel Distribution By Company'
      }
      }
    };
  
    return <Bar data={chartData} options={options} />;
  };


const PieChartStatus: React.FC<{ parcels: any[] }> = ({ parcels }) => {
    const { collected_count, uncollected_count } = getStatus(parcels);
    const data = {
        labels: [`Collected: ${collected_count}`, `Uncollected: ${uncollected_count}`],
        datasets: [
            {
                data: [collected_count, uncollected_count],
                backgroundColor: [
                    '#e4b363ff',
                    '#ef6461ff',
                ],
                borderColor: [
                    '#e4b363ff',
                    '#ef6461ff',
                ],
                borderWidth: 1,
            },
        ],
    };    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
        },
    };
    return <Pie data={data} options={options} />;
} 

const PieChartBatch: React.FC<{ parcels: any[] }> = ({ parcels }) => {
  const { staff_count, bacth_count } = getStaffBatch(parcels);
  const data = {
      labels: [`Staff: ${staff_count}`, `Students: ${bacth_count}`],
      datasets: [
          {
              data: [staff_count, bacth_count],
              backgroundColor: [
                  '#e4b363ff',
                  '#ef6461ff',
              ],
              borderColor: [
                  '#e4b363ff',
                  '#ef6461ff',
              ],
              borderWidth: 1,
          },
      ],
  };    const options = {
      responsive: true,
      plugins: {
          legend: {
              position: 'bottom' as const,
          },
          title: {
            display:true,
            text: 'Parcel Ownership: Staff vs Students'
          }
      },
      radius: '70%'
  };
  return <Pie data={data} options={options} />;
}

export {HorizontalBarChartCompany, BarChartAlltime, PieChartStatus, PieChartBatch};
