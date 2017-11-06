import React from 'react';
import PropTypes from 'prop-types';
import { XYFrame } from 'semiotic';

import ScatterPlot from './d3/scatter-plot';
import LineGraph from './d3/line-graph';
import movieData from '../data/movies-data';

export const ChartType = {
  SEM_LINE_GRAPH: 0,
  LINE_GRAPH: 1,
  SCATTER: 2,
};

// This is merely a generic chart, its props determine what and how the charts
// that are imported from other definitions get rendered

// TODO: type should be an enum

// TODO: Remove dummy data once rendering has been verified


const scatterPlot = (styles, data) => <ScatterPlot {...styles} data={data} />;
const lineGraph = (styles, data) => <LineGraph {...styles} data={data} />;
const semLineGraph = (styles, data) => <p>Semiotics!!!</p>;
// const semLineGraph = (styles, data) => (
//   <XYFrame
//     title="Two Movies"
//     size={[700, 400]}
//   />
// );
const chartFromType = (type, data, styles) => {
  if (type === ChartType.LINE_GRAPH) {
    return lineGraph(styles, data);
  } else if (type === ChartType.SCATTER) {
    return scatterPlot(styles, data);
  } else if (type === ChartType.SEM_LINE_GRAPH) {
    return semLineGraph(styles, data);
  }
  return undefined;
};

export default (props) => {
  const {
    type,
    data,
    styles,
  } = props;
  return chartFromType(type, data, styles);
};
