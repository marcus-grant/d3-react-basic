import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import App from '../imports/app.jsx';

Meteor.startup(() => {                                                                                                                                                              
  ReactDOM.render(<App/>, document.getElementById('react-root'));
});                                                                                                                                                                                 
