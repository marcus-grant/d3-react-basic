import { Meteor } from 'meteor/meteor';
import { randomData, RandomDataType } from '../imports/api/random-data';

Meteor.startup(() => {
  // code to run on server at startup
  // Good place to run basic tests on non visual code
  console.log(randomData(1000, RandomDataType.KEYED_LINSPACE));
});
