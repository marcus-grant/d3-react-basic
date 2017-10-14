import React        from 'react';
import d3           from 'd3';

import ScatterPlot  from './scatter-plot';
import LineGraph    from './line-graph'; 

const styles = {
  width   : 500,
  height  : 300,
  padding : 50,
};

// The number of data points for the chart.
const numDataPoints = 10;

// A function that returns a random number from 0 to 1000
const randomNum     = () => Math.floor(Math.random() * 1000);

// A function that creates an array of 50 elements of (x, y) coordinates.
const randomDataSet = () => {
  return Array.apply(null, {length: numDataPoints}).map(() => [randomNum(), randomNum()]);
}

// Create a time series (equi-spaced independent axis) with random dependant axis
const randomTimeSeries = () => {
  return Array.from(new Array(numDataPoints), (val, index) => [index, randomNum()]);
}

export default class Chart extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
                    radius: 3,
                    data: randomTimeSeries() };
    console.log("Chart.constructor: state.type = ", this.state.type);
    console.log("Chart.constructor: props.type = ", this.props.type);
  }

  randomizeData() {
    if (this.props.type = "scatter") {
      console.log("randomized scatter");
      this.setState({ data: randomDataSet()});
    } else if (this.props.type = "line-graph") {
      console.log("randomized time-series");
      this.setState({ data: randomTimeSeries() }); 
    }
  }

  incrementRadius() { this.setState({ radius: this.state.radius + 1 }); }

  decrementRadius() { this.setState({ radius: this.state.radius - 1 }); }

  render() {
    console.log("render: Chart.state.type = ", this.state.type);
    let chart = null;
    if (this.props.type == 'scatter') {
      chart = <ScatterPlot {...this.state} {...styles} />;
    } else if (this.props.type == 'line-graph'){
      chart = <LineGraph {...this.state} {...styles} />; 
    } else { 
      chart = <h4>ERROR: Plot Type not recognized</h4>; }
    return (
      <div className="chart-container">
        { chart }
        <div className="chart-controls">
          <div className="chart-controls__container">
            <p>Data</p>
            <button
              className="chart-controls__button"
              onClick={() => this.randomizeData()}
            >Randomize</button>
          </div>
          <div className="chart-controls__container">
            <h6>Radius</h6>
            <button
              className="chart-controls__button"
              onClick={() => this.decrementRadius()}
            >-</button>
            <button
              className="chart-controls__button"
              onClick={() => this.incrementRadius()}
            >+</button>
          </div>
        </div>
      </div>
    );
  }
}
