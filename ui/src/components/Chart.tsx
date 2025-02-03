"use client";
import { useEffect, useRef } from "react";
import { createChart, LineData, ISeriesApi } from "lightweight-charts";

const Chart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Crear el gráfico en el contenedor
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300, // Altura del gráfico
      layout: {
        textColor: "#000000",
      },
      grid: {
        vertLines: { color: "#e0e0e0" },
        horzLines: { color: "#e0e0e0" },
      },
      crosshair: {
        mode: 1, // Modo de seguimiento (normal)
      },
      priceScale: {
        borderColor: "#ccc",
      },
      timeScale: {
        borderColor: "#ccc",
      },
    });

    // Agregar una serie de líneas (puedes cambiar por otro tipo)
    const lineSeries = chart.addLineSeries();

    // Datos de ejemplo para la serie
    const data: LineData[] = [
      { time: "2023-01-01", value: 100 },
      { time: "2023-01-02", value: 102 },
      { time: "2023-01-03", value: 105 },
      { time: "2023-01-04", value: 103 },
      { time: "2023-01-05", value: 108 },
    ];

    // Configurar la serie con los datos
    lineSeries.setData(data);

    // Limpiar el gráfico cuando se desmonte el componente
    return () => chart.remove();
  }, []);

  return <div ref={chartContainerRef} style={{ width: "100%", height: "300px" }} />;
};

export default Chart;
