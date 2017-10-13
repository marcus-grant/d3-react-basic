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
const numDataPoints = 50;

// A function that returns a random number from 0 to 1000
const randomNum     = () => Math.floor(Math.random() * 1000);

// A function that creates an array of 50 elements of (x, y) coordinates.
const randomDataSet = () => {
  return Array.apply(null, {length: numDataPoints}).map(() => [randomNum(), randomNum()]);
}

const randomTimeSeries = () => {
  return Array.apply(null, {length: numDataPoints}).map((index) => [index, randomNum()]);
}

export default class Chart extends React.Component{
  constructor(props) {
    super(props);
    this.state = {  type: this.props.type,
                    radius: 3,
                    data: randomDataSet() };
  }

  randomizeData() {
    this.setState({ data: randomDataSet() });
  }

  incrementRadius() {
    this.setState({ radius: this.state.radius + 1 });
  }

  decrementRadius() {
    this.setState({ radius: this.state.radius - 1 });
  }

  render() {
    let content = null;
    if (this.props.type == 'scatter') {
      content = <ScatterPlot {...this.state} {...styles} />;
    } else if (this.props.type == 'line-graph'){
      content = <LineGraph {...this.state} {...styles} />; 
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
        <button className="btn randomize" onClick={() => this.incrementRadius() }>+Radius+</button>
        <button className="btn randomize" onClick={() => this.decrementRadius() }>-Radius-</button>
      </div>
    </div>
    );
  }
}
