import React from 'react';
import PropTypes from 'prop-types';

const plusMinusControls = (title, plusCallback, minusCallback) => (
  <div className="chart-controls__container">
    <h6>{title}</h6>
    <button
      className="chart-controls__button"
      onClick={minusCallback}
    >
    -
    </button>
    <button
      className="chart-controls__button"
      onClick={plusCallback}
    >
    +
    </button>
  </div>
);


const radiusControls = (plusCallback, minusCallback) =>
  plusMinusControls('Radius', plusCallback, minusCallback);

const singleControl = (title, actionTitle, callback) => (
  <div className="chart-controls__container">
    <h6>{title}</h6>
    <button
      className="chart-controls__button"
      onClick={callback}
    >{actionTitle}
    </button>
  </div>
);

const randomizeControls = callback =>
  singleControl('Data', 'Randomize', callback);

const ChartControls = props => (
  <div className="chart-controls">
    { randomizeControls(props.randomizeDataCallback) }
    {
      radiusControls(
        props.incrementRadiusCallback,
        props.decrementRadiusCallback,
      )
    };
  </div>
);

export default ChartControls;

// export default class ChartControls extends React.Component {
//   render() {
//     console.log(this.props);
//     return (
//       <div className="chart-controls">
//         { randomizeControls(this.props.randomizeDataCallback) }
//         { radiusControls(
//           this.props.incrementRadiusCallback,
//           this.props.decrementRadiusCallback,
//         )}
//       </div>
//     );
//   }
// }

ChartControls.propTypes = {
  randomizeDataCallback: PropTypes.func.isRequired,
  incrementRadiusCallback: PropTypes.func.isRequired,
  decrementRadiusCallback: PropTypes.func.isRequired,
};
