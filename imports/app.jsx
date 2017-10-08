import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Chart from './chart.jsx';
import Home from './home.jsx';

const routes = [
  {
    path: '/',
    text: 'HOME',
    exact: true,
    component: <Home />,
  },
  {
    path: '/scatter',
    text: 'SCATTER',
    component: <Chart type='scatter'/>
  },
];

export default class App extends React.Component {
  renderRoutes() {
    return ({
      routes.map((route, index) => (
        <Route
          path={route.path},
          component={route.component},
          exact={route.exact},
        />
      ));
    });
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          {renderRoutes()}
        <BrowserRouter/>
      </div>
    );
  }
}
