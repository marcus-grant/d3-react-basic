import React from 'react';
import PropTypes from 'prop-types';

import ScatterPlot from './d3/scatter-plot';
import LineGraph from './d3/line-graph';

// This is merely a generic chart, its props determine what and how the charts
// that are imported from other definitions get rendered

// TODO: type should be an enum

const scatterPlot = (styles, data) => <ScatterPlot {...styles} data={data} />;
const lineGraph = (styles, data) => <LineGraph {...styles} data={data} />;
const semLineGraph = (styles, data) => <p>{styles}{data}</p>; // TODO: put semiotic version here
const chartFromType = (type, data, styles) => {
  if (type === 'line') {
    return lineGraph(styles, data);
  } else if (type === 'scatter') {
    return scatterPlot(styles, data);
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
