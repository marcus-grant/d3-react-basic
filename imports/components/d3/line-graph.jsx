import React from 'react';
import d3 from 'd3';
import PropTypes from 'prop-types';

// TODO: A linegraph should just be a scatter plot with
// lines connected between datadots of adjacent keyvalues


import DataDots from './data-dots';

const xMax = data => d3.max(data, d => d[0]);
const yMax = data => d3.max(data, d => d[1]);

const xScale = props => d3.scaleLinear()
  .domain([0, xMax(props.data)])
  .range([props.padding, props.width - (props.padding * 2)]);
const yScale = props => d3.scaleLinear()
  .domain([0, yMax(props.data)])
  .range([props.height - props.padding, props.padding]);

const Chart = (props) => {
  const scales = { xScale: xScale(props), yScale: yScale(props) };
  return (
    <svg
      className="chart-canvas"
      width={props.width}
      height={props.height}
    >
      <DataDots {...props} {...scales} />
    </svg>);
};

Chart.propTypes = {
  data: PropTypes.arrayOf(React.PropTypes.number).isRequired,
  padding: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Chart;
