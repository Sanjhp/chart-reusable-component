import React from "react";
import BaseChart from "./components/BaseChart2";

const App = () => {
  const stackBarData = [
    {
      category: "Fund Distribution",
      Equity: 32.19,
      Gold: 26.04,
      "Govt. Securities": 26.4,
      Bonds: 15.37,
    },
  ];

  const pieChartData = [
    ["Category", "Percentage"],
    ["Flexi Cap Fund", 32.19],
    ["Small Cap Fund", 26.4],
    ["Sectoral Fund", 26.4],
    ["ELSS", 26.04],
    ["Index Fund", 12.03],
    ["Large & Mid Cap Fund", 12.03],
  ];

  const treemapData = [
    ["Location", "Parent", "Market Volume"],
    ["Global", null, 0],
    ["Oil & Gas", "Global", 32.19],
    ["Private Bank", "Global", 26.04],
    ["Pharmaceuticals", "Global", 26.4],
    ["Construction", "Global", 12.03],
    ["Power Generation", "Global", 26.4],
    ["Other", "Global", 12.03],
  ];

  return (
    <div className="outer-chart-container">
      <BaseChart
        type="pie"
        data={pieChartData}
        description="This is a pie chart showing distribution of investments"
        subhead="Sub-Category"
        desc="The assets are distributed between equity and cash & equivalents."
      />
      <BaseChart
        type="stackedBar"
        data={stackBarData}
        description="This is a stacked bar chart showing distribution"
        subhead="Fund Distribution"
        desc="A mutual fund distribution represents the earnings of a fund being passed on to the individual investor or unit holder of the fund."
      />
      <BaseChart
        type="treemap"
        data={treemapData}
        description="This is a treemap chart showing distribution of investments"
        subhead="Investment Distribution"
        desc="The assets are distributed among different sectors."
      />
    </div>
  );
};

export default App;
