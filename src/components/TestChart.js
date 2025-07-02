import React from "react";
import Chart from "react-apexcharts";

export default function TestChart() {
  const options = {
    chart: { type: "bar" },
    xaxis: { categories: ["A", "B", "C"] },
    title: { text: "Gráfica mínima de prueba", align: "center" }
  };
  const series = [
    { name: "Test", data: [1, 2, 3] }
  ];
  return (
    <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)' }}>
      <Chart options={options} series={series} type="bar" height={300} />
    </div>
  );
}
