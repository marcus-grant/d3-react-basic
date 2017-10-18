import React from 'react';
// import { BrowserRouter } from 'react-router-dom';

import Workspace from './components/workspace';

// import Home from './components/home';

// const routes = [
//   {
//     path: '/',
//     text: 'HOME',
//     exact: true,
//     component: <Home />,
//   },
//   {
//     path: '/scatter',
//     text: 'SCATTER',
//     component: <Chart type='scatter'/>
//   },
// ];
//
// const chartStyles = {
//   padding: 32,
//   width: 500,
//   height: 320
// }

export default () => (
  <div className="workspace">
    <Workspace chartType="line" />
  </div>
);

// export default class App extends React.Component {
// renderRoutes() {
//   return ({
//     routes.map((route, index) => (
//       <Route
//         path={route.path},
//         component={route.component},
//         exact={route.exact},
//       />
//     ));
//   });
// }
//   render() {
//     return (
//       <div className="app-container">
//         <Chart type="line-graph"/>
//       </div>
//     );
//   }
// }
