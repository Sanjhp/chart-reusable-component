// BaseChart.js
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BaseChart = ({ type, data, title, description, subhead, desc }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (!data || data.length === 0) {
      console.error("Data is missing or empty.");
      return;
    }

    const svg = d3.select(chartRef.current);

    svg.selectAll("*").remove();

    const width = 600;
    const height = 400;
    const stackheight = 100;
    const margin = { top: 40, right: 20, bottom: 50, left: 60 };

    const svgElement = svg
      .attr("width", width)
      .attr("height", height)
      .attr("stackheight", stackheight);

    switch (type) {
      case "horizontalBar":
        renderHorizontalBarChart(svgElement, data, width, height, margin);
        break;

      case "pie":
        renderPieChart(svgElement, data, width, height, margin);
        break;

      case "stackedBar":
        renderStackedBarChart(
          svgElement,
          data,
          width,
          height,
          stackheight,
          margin
        );
        break;

      default:
        console.error(`Invalid chart type: ${type}`);
        break;
    }

    // Add title
    svgElement
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .text(title);

    // Add description
    svgElement
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - margin.bottom / 2)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text(description);
  }, [type, data, title, description]);

  const renderStackedBarChart = (
    svg,
    data,
    width,
    height,
    stackheight,
    margin
  ) => {
    const keys = Object.keys(data[0]).slice(1);
    const stack = d3
      .stack()
      .keys(keys)
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);
    const stackedData = stack(data);

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(stackedData[stackedData.length - 1], (d) => d[1])])
      .nice()
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleBand()
      .domain(data.map((d) => d.category))
      .range([stackheight - margin.bottom, margin.top])
      .padding(0.1);

    const color = d3.scaleOrdinal().domain(keys).range(d3.schemeCategory10);

    svg
      .selectAll("g")
      .data(stackedData)
      .enter()
      .append("g")
      .attr("fill", (d) => color(d.key))
      .selectAll("rect")
      .data((d) => d)
      .enter()
      .append("rect")
      .attr("y", (d) => yScale(d.data.category))
      .attr("x", (d) => xScale(d[0]))
      .attr("height", yScale.bandwidth())
      .attr("width", (d) => xScale(d[1]) - xScale(d[0]));

    // Remove x-axis and y-axis lines
    svg.selectAll(".domain").remove();

    // Calculate legend position below the chart
    const legendWidth = 18;
    const legendPadding = 5;
    const legendItemWidth = 100; // Adjust as needed
    const totalLegendWidth =
      keys.length * (legendWidth + legendPadding + legendItemWidth);
    const legendX = (width - totalLegendWidth) / 2;
    const legendY = stackheight + margin.top + margin.bottom - 20;

    // Add legends
    const legend = svg
      .selectAll(".legend")
      .data(keys)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr(
        "transform",
        (d, i) =>
          `translate(${
            legendX + i * (legendWidth + legendPadding + legendItemWidth)
          }, ${legendY})`
      );

    legend
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", legendWidth)
      .attr("height", legendWidth)
      .attr("fill", color);

    legend
      .append("text")
      .attr("x", legendWidth + legendPadding)
      .attr("y", legendWidth / 2)
      .attr("dy", "0.35em")
      .text((d) => d);
  };

  const renderHorizontalBarChart = (svg, data, width, height, margin) => {
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.category))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .nice()
      .range([innerHeight, 0]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.category))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => innerHeight - yScale(d.value))
      .attr("fill", (d, i) => colorScale(i));

    // Draw axes for bar chart
    const xAxis = d3.axisBottom(xScale);
    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis)
      .append("text")
      .attr("x", innerWidth / 2)
      .attr("y", margin.bottom * 0.75)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .text("Categories");

    const yAxis = d3.axisLeft(yScale);
    g.append("g")
      .call(yAxis)
      .append("text")
      .attr("x", -innerHeight / 2)
      .attr("y", -margin.left * 0.75)
      .attr("fill", "black")
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Values");
  };

  const renderPieChart = (svg, data, width, height, margin) => {
    const radius = Math.min(width, height) / 2 - margin.top;

    const pie = d3.pie().value((d) => d.value);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const arcs = svg
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`)
      .selectAll("arc")
      .data(pie(data))
      .enter();

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => d3.schemeCategory10[i])
      .attr("stroke", "white")
      .style("stroke-width", "2px");
  };

  return (
    <div>
      <h2>{subhead}</h2>
      <p>{desc}</p>
      <svg ref={chartRef}></svg>
    </div>
  );
};

export default BaseChart;
