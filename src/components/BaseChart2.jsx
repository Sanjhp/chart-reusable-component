import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BaseChart = ({ type, data, subhead, desc }) => {
  const columns = ["Category", "Percentage"];

  // Styles for heading, container, canvas, and description
  const headingStyle = {
    fontFamily: "IBM Plex Sans",
    fontSize: "30px",
    fontWeight: 400,
  };
  const chartContainerStyle = {
    margin: "20px",
    maxWidth: "380px",
    height: "auto",
    borderRadius: "35px",
    padding: "10px 20px",
    border: "0.5px solid black",
  };
  const canvasStyle = {
    marginBottom: "20px",
  };
  const descriptionStyle = {
    fontFamily: "IBM Plex Sans",
    fontSize: "16px",
    fontWeight: 200,
  };

  // Use useRef to create a unique reference for each chart
  const chartRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) {
      console.error("Data is missing or empty.");
      return;
    }

    const ctx = chartRef.current.getContext("2d");

    // Destroy existing chart to prevent memory leaks
    if (window.chartInstance) {
      window.chartInstance.destroy();
    }

    switch (type) {
      case "stackedBar":
        renderStackedBarChart(ctx, data);
        break;
      case "pie":
        renderPieChart(ctx, data);
        break;

      default:
        console.error(`Invalid chart type: ${type}`);
        break;
    }

    // Cleanup function to destroy the chart instance
    return () => {
      if (window.chartInstance) {
        window.chartInstance.destroy();
      }
    };
  }, [type, data]);

  // Function to render the stacked bar chart
  const renderStackedBarChart = (ctx, data) => {
    const labels = data.map((item) => item.category);
    const datasets = Object.keys(data[0])
      .slice(1)
      .map((key) => ({
        label: key,
        data: data.map((item) => item[key]),
        backgroundColor: getRandomColor(),
        barThickness: 15,
      }));

    window.chartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        datasets: datasets,
        labels: labels,
      },
      options: {
        plugins: {
          title: {
            display: false,
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              boxWidth: 20, // Adjust the width of legend items
              usePointStyle: true, // Use point style for legend items
            },
          },
        },
        indexAxis: "y",
        scales: {
          x: {
            stacked: true,
            display: false,
          },
          y: {
            stacked: true,
            display: false,
          },
        },
      },
    });
  };

  // Function to render the pie chart
  const renderPieChart = (ctx, data) => {
    const labels = data.map((item) => item.label);
    const dataset = {
      data: data.map((item) => item.data),
      backgroundColor: data.map(() => getRandomColor()),
    };

    window.chartInstance = new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [dataset],
      },
      options: {
        plugins: {
          title: {
            display: false,
          },
          legend: {
            display: true,
            position: "bottom",
            labels: {
              boxWidth: 20,
            },
          },
        },
      },
    });
  };

  // Function to generate random color
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Render the component
  return (
    <div style={chartContainerStyle}>
      <h2 style={headingStyle}>{subhead}</h2>
      <p style={descriptionStyle}>{desc}</p>
      <div style={canvasStyle}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default BaseChart;
