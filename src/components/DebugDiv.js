import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MyChart from "./MyChart";

const MOCK_CHART = {
  caption: "Gráfica de ejemplo: Ventas por mes",
  chart_type: "bar",
  chart_configuration: {
    options: {
      chart: { type: "bar", height: 420, stacked: false },
      plotOptions: { bar: { horizontal: false, columnWidth: "55%", endingShape: "rounded" } },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ["transparent"] },
      title: { text: "Ventas por mes", align: "center" },
      xaxis: { categories: ["Enero", "Febrero", "Marzo"], title: { text: "Mes" } },
      yaxis: [{ title: { text: "Ventas ($)" } }],
      fill: { opacity: 1 },
      legend: { position: "right", verticalAlign: "middle" }
    },
    series: [
      { name: "Producto A", data: [120, 200, 150] },
      { name: "Producto B", data: [80, 160, 100] }
    ]
  }
};

const DebugDiv = ({ chartJson }) => {
  // Mantener el último chartJson válido
  const [lastValidChart, setLastValidChart] = React.useState(null);

  React.useEffect(() => {
    if (chartJson && chartJson.chart_type && chartJson.chart_configuration) {
      setLastValidChart(chartJson);
    }
    // Si quieres limpiar la gráfica cuando chartJson sea null, descomenta:
    // else if (chartJson === null) setLastValidChart(null);
  }, [chartJson]);

  const isChart = lastValidChart && typeof lastValidChart === 'object' && lastValidChart.chart_type && lastValidChart.chart_configuration;
  return (
    <Box sx={{ bgcolor: '#fff', p: 3, borderRadius: 4, boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)', mb: 4, mt: 4, color: '#111' }}>
      {/* Título eliminado, solo se muestra la gráfica si existe */}
      {isChart && (
        <MyChart
          caption={lastValidChart.caption}
          options={lastValidChart.chart_configuration.options}
          series={lastValidChart.chart_configuration.series}
          type={lastValidChart.chart_type}
        />
      )}
    </Box>
  );
};

export default DebugDiv;
