import React from 'react';

import Chart from './chart.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>D3 Randomized Scatter Plot</h1>
        <Chart />
      </div>
    );
  }
}
