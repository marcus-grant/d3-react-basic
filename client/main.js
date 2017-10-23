import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import App from '../imports/app';

Meteor.startup(() => {
  const app = <App />;
  ReactDOM.render(app, document.getElementById('react-root'));
});
