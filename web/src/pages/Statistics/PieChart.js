import React from "react";
import Chart from "chart.js";

class PieChart extends React.Component {
  chartRef = React.createRef();

  componentDidUpdate(prevState, prevProps) {
    if (this.props.data.length !== 0) {
      const myChartRef = this.chartRef.current.getContext("2d");
      let myPieChart = new Chart(myChartRef, {
        type: "pie",
        data: this.props.data,
        options: {},
      });
    }
  }

  render() {
    return (
      <div>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default PieChart;
