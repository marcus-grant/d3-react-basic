import React from 'react';
// import PropTypes from 'prop-types';

import { Chart, ChartType } from './chart';
import { randomData, RandomDataType } from '../api/random-data';
import movieData from '../data/movies-data';

// This class concerns itself with managing the state and styles of a chart and its controls
export default class Workspace extends React.Component {
  state = {
    chartType: ChartType.SEM_LINE_GRAPH,
    styles: {
      chartWidth: 560,
      chartHeight: 360,
      chartPadding: 30,
      dataRadius: 3,
      dataStroke: 2,
    },
    numDataPoints: 10,
    // data: randomData(10, RandomDataType.LINSPACE),
    data: movieData,
  };
  render() {
    // const styles = {
    //   chartWidth,
    //   chartHeight,
    //   chartPadding,
    //   dataRadius,
    //   dataStroke,
    // } = this.state;
    console.log('[Workspace.render()]: this.state = ', this.state);
    return (
      <div className="workspace">
        <Chart
          type={this.state.chartType}
          data={this.state.data}
          styles={this.state.styles}
        />
        <h3>Controls Placeholder</h3>
      </div>
    );
  }
}
