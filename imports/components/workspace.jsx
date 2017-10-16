import React from 'react';
import PropTypes from 'prop-types';

import Chart from './chart';
import ChartControls from './chart-controls';
import randomData from '../api/random-data';


// TODO: Add enum types for the different chart types

export default class Workspace extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {
      chartType: this.props.chartType,
      numDataPoints: 10,
    };
    this.setState = {
      chartWidth: 560,
      chartHeight: 360,
      chartPadding: 30,
      dataRadius: 3,
      dataStroke: 2,
      data: randomData(this.state.numDataPoints, randomData.type.linspace),
    };
  }

  randomizeData() { }

  setDataPoints(newNumDataPoints) {
    this.setState({ numDataPoints: newNumDataPoints });
  }

  setDataRadius(newRadius) { this.setState({ dataRadius: newRadius }); }

  setDataStroke(newStroke) { this.setState({ dataStroke: newStroke }); }

  setChartStyle(styles) {
    this.setState({
      chartWidth: styles.width,
      chartHeight: styles.height,
      chartPadding: styles.padding,
    });
  }

  render() {
    const chartProps = {
      type: this.state.chartType,
      data: this.state.data,
      styles: {
        width: this.state.chartWidth,
        height: this.state.chartHeight,
        padding: this.state.chartPadding,
        radius: this.state.dataRadius,
        stroke: this.state.dataStroke,
      },
    };

    const controlsHandlers = {
      this.randomizeData(),
      setDataPoints(num),
    };

    return (
      <div className="workspace">
        <Chart />
        <ChartControls />
      </div>
    );
  }
}

Workspace.propTypes = {
  chartType: PropTypes.string.isRequired,
};
