import React from 'react';

const renderDots = (props) => {
  return (coords, index) => {
    const dotProps = {
      cx:   props.xScale(coords[0]),
      cy:   props.yScale(coords[1]),
      r:    props.radius || 2 ,
      key:  index
    };
    return <circle {...dotProps} />;
  };
};

export default (props) => { 
  return <g>{ props.data.map(renderDots(props)) }</g>;
};
