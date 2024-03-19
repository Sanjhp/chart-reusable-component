import React from "react";
import Chart from "react-google-charts";

const BaseChart = ({ type, data, subhead, desc }) => {
  // Styles for heading, container, and description
  const headingStyle = {
    fontFamily: "IBM Plex Sans",
    fontSize: "30px",
    fontWeight: 400,
  };
  const chartContainerStyle = {
    width: "33%",
    height: "auto",
    borderRadius: "35px",
    padding: "10px 20px",
    border: "0.5px solid black",
    boxSizing: "border-box",
    margin: "10px",
  };
  const descriptionStyle = {
    fontFamily: "IBM Plex Sans",
    fontSize: "16px",
    fontWeight: 200,
  };

  // Render the component based on the chart type
  const renderChart = () => {
    switch (type) {
      case "pie":
        return (
          <Chart
            width={"100%"}
            height={"300px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
              legend: {
                position: "bottom",
                maxLines: Math.ceil(data.length / 2), // Calculate maxLines based on number of legend items
              },
            }}
          />
        );
      case "treemap":
        return (
          <Chart
            width={"100%"}
            height={"300px"}
            chartType="TreeMap"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
              legend: {
                maxLines: Math.ceil(data.length / 2), // Calculate maxLines based on number of legend items
              },
            }}
          />
        );
      case "stackedBar":
        return (
          <Chart
            width={"100%"}
            height={"100px"}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={formatStackedBarData(data)}
            options={{
              legend: {
                position: "bottom",
                maxLines: Math.ceil(data[0].length / 2), // Calculate maxLines based on number of legend items
              },
              isStacked: true,
            }}
          />
        );
      default:
        console.error(`Invalid chart type: ${type}`);
        return null;
    }
  };

  // Function to format data for stacked bar chart
  const formatStackedBarData = (data) => {
    if (data.length > 0 && data[0].category) {
      const formattedData = data.map((item) => {
        const formattedItem = [item.category];
        Object.keys(item).forEach((key) => {
          if (key !== "category") {
            formattedItem.push(item[key]);
          }
        });
        return formattedItem;
      });
      formattedData.unshift([
        "Category",
        ...Object.keys(data[0]).filter((key) => key !== "category"),
      ]);
      return formattedData;
    }
    return data;
  };

  // Render the component
  return (
    <div style={chartContainerStyle}>
      <h2 style={headingStyle}>{subhead}</h2>
      <p style={descriptionStyle}>{desc}</p>
      {renderChart()}
    </div>
  );
};

export default BaseChart;
