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
        {/* <BaseChart
          type="stackedBar"
          data={this.stackBarData}
          description="This is a stacked bar chart showing distribution"
          subhead="Fund Distribution"
          desc="A mutual fund distribution represents the earnings of a fund being passed on to the individual investor or unit holder of the fund."
        /> */}
      </div>
    );
  }
}

export default App;
