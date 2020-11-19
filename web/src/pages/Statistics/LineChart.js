import React from "react";
import Chart from "chart.js";

class LineChart extends React.Component {
  chartRef = React.createRef();

  componentDidUpdate(prevState, prevProps) {
    if (this.props.data.length !== 0) {
      const myChartRef = this.chartRef.current.getContext("2d");

      new Chart(myChartRef, {
        type: "bar",
        data: this.props.data,
        options: {
          legend: {
            display: false,
          },
        },
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

export default LineChart;
