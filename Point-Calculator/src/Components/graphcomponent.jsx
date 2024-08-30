import { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';
import './graph.css'
ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);
export default function GraphComponent(){
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = () => {
            const savedHistory = localStorage.getItem('pointsHistory');
            if (savedHistory) {
                setHistory(JSON.parse(savedHistory));
            }
        };

        fetchHistory();

        
        const handleStorageChange = () => fetchHistory();
        window.addEventListener('storage', handleStorageChange);

        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);
    const data = {
        labels: history.map(entry => new Date(entry.timestamp).toLocaleDateString()),
        datasets: [
            {
                label: 'Total Points Over Time',
                data: history.map(entry => entry.totalPoints),
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1
            }
        ]
    };
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            color: 'rgba(255, 87, 34, 1)',
            text: 'Scores',
          },
        },
        scales: {
          x: {
            grid: {
              display: false, 
            },
            ticks: {
              color: 'rgba(255, 87, 34, 1)', 
            },
          },
          y: {
            grid: {
              color: '#ddd', 
            },
            ticks: {
              color: 'rgba(255, 87, 34, 1)', 
            },
          },
        },
      };
      const chartRef = useRef(null);
    return (
        <div className="Graph-Container">
        <Line className="graph" data={data} options={options} ref={chartRef} />
        </div>
    )
}