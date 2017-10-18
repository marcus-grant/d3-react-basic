import React from 'react';
import PropTypes from 'prop-types';

const renderDots = props => (coords, index) => {
  const dotProps = {
    cx: props.xScale(coords[0]),
    cy: props.yScale(coords[1]),
    r: props.radius || 2,
    key: index,
  };
  return <circle {...dotProps} />;
};

const DataDots = props => (
  <g>{ props.data.map(renderDots(props)) }</g>
);

export default DataDots;

DataDots.propTypes = {
  xScale: PropTypes.func.isRequired,
};
