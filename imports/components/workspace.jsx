import React from 'react';
import PropTypes from 'prop-types';

import Chart from './chart';
import ChartControls from './chart-controls';
import { randomData, RandomDataType } from '../api/random-data';


// TODO: Add enum types for the different chart types

export default class Workspace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numDataPoints: 10,
      chartType: this.props.chartType,
      dataSetType: RandomDataType.LINSPACE,
      chartWidth: 560,
      chartHeight: 360,
      chartPadding: 30,
      dataRadius: 3,
      // dataStrokeWidth: 2,
      data: [],
    };
  }

  // setChartStyle(styles) {
  //   this.setState({
  //     chartWidth: styles.width,
  //     chartHeight: styles.height,
  //     chartPadding: styles.padding,
  //   });
  // }

  // setDataPoints(newNumDataPoints) {
  //   this.setState({ numDataPoints: newNumDataPoints });
  // }

  incrementRadius = () => { this.setState({ dataRadius: this.state.dataRadius + 1 }); }
  decrementRadius = () => { this.setState({ dataRadius: this.state.dataRadius - 1 }); }

  // setDataStroke(newStroke) { this.setState({ dataStroke: newStroke }); }

  randomizeData = () => {
    const newData = randomData(this.state.numDataPoints, this.state.dataSetType);
    this.setState({ data: newData });
  }

  render() {
    const chartStyles = {
      padding: this.state.chartPadding,
      width: this.state.chartWidth,
      height: this.state.chartHeight,
    };
    const controlsCallbacks = {
      randomizeDataCallback: this.randomizeData,
      incrementRadiusCallback: this.incrementRadius,
      decrementRadiusCallback: this.decrementRadius,
    };
    return (
      <div className="workspace">
        <Chart
          type={this.state.chartType}
          data={this.state.data}
          styles={chartStyles}
        />
        <ChartControls {...controlsCallbacks} />
      </div>
    );
  }
}

Workspace.propTypes = {
  chartType: PropTypes.string.isRequired,
};
