import React from "react";
import Chart from "react-apexcharts";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MarkdownRenderer from "./MarkdownRenderer.js";

// Función para forzar el formateo de miles y decimales en todos los puntos posibles
function patchFormatters(options) {
  // Formateador universal
  const numberFormatter = (v) => {
    if (typeof v === "number") {
      return v.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    // Si ya viene como string, intenta convertirlo
    const n = Number(v);
    if (!isNaN(n)) {
      return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return v;
  };

  // Helper para convertir string de función a función real
  function ensureFunction(val) {
    if (typeof val === "function") return val;
    if (typeof val === "string" && val.trim().startsWith("function")) {
      // eslint-disable-next-line no-eval
      return eval(`(${val})`);
    }
    // Si no es función ni string de función, devuelve el formateador universal
    return numberFormatter;
  }

  const patched = { ...options };

  // yaxis.labels
  if (patched.yaxis) {
    const yaxes = Array.isArray(patched.yaxis) ? patched.yaxis : [patched.yaxis];
    yaxes.forEach((y) => {
      if (y && y.labels) {
        y.labels.formatter = numberFormatter;
      } else if (y) {
        y.labels = { formatter: numberFormatter };
      }
    });
    patched.yaxis = Array.isArray(patched.yaxis) ? yaxes : yaxes[0];
  }

  // dataLabels
  if (patched.dataLabels) {
    patched.dataLabels.formatter = numberFormatter;
  } else {
    patched.dataLabels = { formatter: numberFormatter };
  }

  // tooltip.y
  if (patched.tooltip && patched.tooltip.y) {
    patched.tooltip.y.formatter = numberFormatter;
  } else if (patched.tooltip) {
    patched.tooltip.y = { formatter: numberFormatter };
  } else {
    patched.tooltip = { y: { formatter: numberFormatter } };
  }

  return patched;
}

const MyChart = ({ caption, options, series, type }) => {
  // Forzar formateo aunque el modelo no lo ponga
  const patchedOptions = patchFormatters(options || {});
  return (
    <Box sx={{ width: '100%', mx: 'auto', my: 3 }}>
      <Box
        sx={{
          bgcolor: "#fff",
          p: 3,
          borderRadius: 4,
          overflow: "visible",
          minHeight: 480,
          width: '100%',
          boxShadow: "0 2px 16px 0 rgba(0,0,0,0.08)",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#111',
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Chart options={patchedOptions} series={series} type={type} height={420} width="100%" />
        </Box>
        <Typography component="div" variant="body1" sx={{ width: '100%', mt: 2, color: '#111' }}>
          <MarkdownRenderer content={caption} />
        </Typography>
      </Box>
    </Box>
  );
};

export default MyChart;
