import React from 'react';

export default class ChartControls extends React.Component {
  render() {
    const radiusControls = (
      <div className="chart-controls__container">
        <h6>Radius</h6>
        <button
          className="chart-controls__button"
          onClick={() => this.decrementRadius()}
        >
        -
        </button>
        <button
          className="chart-controls__button"
          onClick={() => this.incrementRadius()}
        >
        +
        </button>
      </div>
    );
    return (
      <div className="chart-controls">
        <div className="chart-controls__container">
          <p>Data</p>
          <button
            className="chart-controls__button"
            onClick={() => this.randomizeData()}
          >
            Randomize
          </button>
        </div>
        { radiusControls }
      </div>
    );
  }
}
