// import React from "react";
// import BaseChart from "./components/BaseChart";

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.defaultData = [
//       { category: "A", value: 10 },
//       { category: "B", value: 20 },
//       { category: "C", value: 30 },
//       { category: "D", value: 40 },
//       { category: "E", value: 50 },
//     ];

//     this.stackedBarChartData = [
//       { category: "A", value1: 10, value2: 20, value3: 30 },
//     ];
//   }

//   render() {
//     return (
//       <div>
//         <BaseChart
//           type="horizontalBar"
//           data={this.defaultData}
//           subhead="Title Chart"
//           desc="This is the description of chart"
//         />
//         <BaseChart
//           type="pie"
//           data={this.defaultData}
//           title="Pie Chart"
//           description="This is a pie chart showing distribution"
//           subhead="Pie Chart Example"
//           desc="This pie chart illustrates the distribution of values across categories."
//         />

//         <BaseChart
//           type="stackedBar"
//           data={this.stackedBarChartData}
//           title="Bullet Chart"
//           description="This is a Bullet chart showing distribution"
//           subhead="Bullet Chart Example"
//           desc="This bullet chart illustrates the distribution of values across categories."
//         />
//       </div>
//     );
//   }
// }

// export default App;
import React from "react";
import BaseChart from "./components/BaseChart2";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.stackBarData = [
      {
        category: "Fund Distribution",
        Equity: 32.19,
        Gold: 26.04,
        "Govt. Securities": 26.4,
        Bonds: 15.37,
      },
    ];
    this.pieChartData = [
      { label: "Flexi Cap Fund", data: 32.19 },
      { label: "Small Cap Fund", data: 26.4 },
      { label: "Sectoral Fund", data: 26.4 },
      { label: "ELSS", data: 26.04 },
      { label: "Index Fund", data: 12.03 },
      { label: "Large & Mid Cap Fund", data: 12.03 },
    ];
    this.heatMapData = [
      { xLabel: "Oil & Gas", yLabel: "Private Bank", value: 32.19 },
      { xLabel: "Oil & Gas", yLabel: "Pharmaceuticals", value: 26.04 },
      { xLabel: "Private Bank", yLabel: "Pharmaceuticals", value: 26.4 },
      { xLabel: "Pharmaceuticals", yLabel: "Construction", value: 12.03 },
      { xLabel: "Construction", yLabel: "Power Generation", value: 26.4 },
      { xLabel: "Power Generation", yLabel: "Other", value: 12.03 },
    ];
  }

  render() {
    return (
      <div>
        <BaseChart
          type="pie"
          data={this.pieChartData}
          description="This is a pie chart showing distribution of investments"
          subhead="Sub-Category"
          desc="The assets are distributed between equity and cash & equivalents."
        />
        <BaseChart
          type="stackedBar"
          data={this.stackBarData}
          description="This is a stacked bar chart showing distribution"
          subhead="Fund Distribution"
          desc="A mutual fund distribution represents the earnings of a fund being passed on to the individual investor or unit holder of the fund."
        />
        {/* <BaseChart
          type="heatmap"
          data={this.heatMapData}
          description="This is a heatmap chart showing distribution"
          subhead="Top Sectors"
          desc="The assets are distributed between equity and cash & equivalents. "
        /> */}
      </div>
    );
  }
}

export default App;
