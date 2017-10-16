import React from 'react';
import PropTypes from 'prop-types';

import ScatterPlot from './d3/scatter-plot';
import LineGraph from './d3/line-graph';

// This is merely a generic chart, its props determine what and how the charts
// that are imported from other definitions get rendered

const scatterPlot = (data, styles) => <ScatterPlot {...data}{...styles} />;
const lineGraph = (data, styles) => <LineGraph {...data}{...styles} />;
const chartFromType = (type, data, styles) => {
  if (type === 'line') {
    return lineGraph(data, styles);
  } else if (type === 'scatter') {
    return scatterPlot(data, styles);
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

React.propTypes = {
  type: PropTypes.string.isRequired,
};
