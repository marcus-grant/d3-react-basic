import React       from 'react';
import ScatterPlot from './scatter-plot';

const styles = {
  width   : 500,
  height  : 300,
  padding : 30,
};

// The number of data points for the chart.
const numDataPoints = 50;

// A function that returns a random number from 0 to 1000
const randomNum     = () => Math.floor(Math.random() * 1000);

// A function that creates an array of 50 elements of (x, y) coordinates.
const randomDataSet = () => {
  return Array.apply(null, {length: numDataPoints}).map(() => [randomNum(), randomNum()]);
}

export default class Chart extends React.Component{
  constructor(props) {
    super(props);
    this.state = { type: this.props.type,
                  data: randomDataSet() };
  }

  randomizeData() {
    this.setState({ data: randomDataSet() });
  }

  render() {
    let content = null;
    if (this.props.type == 'scatter') {
      content = <ScatterPlot {...this.state} {...styles} />;
    } else { 
      content = <h4>ERROR: Plot Type not recognized</h4>; }
    return (
    <div>
      <div className="chart__canvas">
        {content}
      </div>
      <div className="controls">
        <button className="btn randomize" onClick={() => this.randomizeData()}>
          Randomize Data
        </button>
      </div>
    </div>
    );
  }
}
