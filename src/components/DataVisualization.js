import React from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from "chart.js";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

const DataVisualization = ({ data }) => {
  
  const vehicleTypes = data.reduce((acc, curr) => {
    acc[curr["Electric Vehicle Type"]] = (acc[curr["Electric Vehicle Type"]] || 0) + 1;
    return acc;
  }, {});
  const pieData = {
    labels: Object.keys(vehicleTypes),
    datasets: [
      {
        data: Object.values(vehicleTypes),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Line Chart - Electric Range by Model Year
  const rangeByYear = data.reduce((acc, curr) => {
    acc[curr["Model Year"]] = (acc[curr["Model Year"]] || 0) + curr["Electric Range"];
    return acc;
  }, {});
  const lineData = {
    labels: Object.keys(rangeByYear).sort(),
    datasets: [
      {
        label: "Electric Range",
        data: Object.keys(rangeByYear).sort().map((year) => rangeByYear[year]),
        borderColor: "#36A2EB",
        fill: false,
      },
    ],
  };

  // Bar Chart - Vehicle Count by County
  const countByCounty = data.reduce((acc, curr) => {
    acc[curr["County"]] = (acc[curr["County"]] || 0) + 1;
    return acc;
  }, {});
  const barData = {
    labels: Object.keys(countByCounty),
    datasets: [
      {
        label: "Number of Vehicles",
        data: Object.values(countByCounty),
        backgroundColor: "#FFCE56",
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2>Pie Chart: Electric Vehicle Types</h2>
      <Pie data={pieData} className="pie-chart" />

      <h2>Line Chart: Electric Range by Model Year</h2>
      <Line data={lineData} className="line-chart" />

      <h2>Bar Chart: Vehicle Count by County</h2>
      <Bar data={barData} className="bar-chart" />
    </div>
  );
};

export default DataVisualization;
