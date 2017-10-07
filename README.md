# d3-react-basic

# Notes

## D3
- D3, like React is declarative
- Unlike React, D3 uses data binding
  - React is uni-directional in its data flow
- To get around this, since SVG lives in the DOM, let React handle displaying SVG represantations of the data
- Also let D3 handle the math
- React will handle the transitions, updates, and removals

## The First Example App
- The first example will be a Scatter Plot of randomly generated data
- First, since I'm using meteor let's create the hello world version that includes `react` & `react-dom` and excludes all meteor boilerplate that conflicts

`client/main.html`
```html
<head>
  <title>d3-react-basic</title>
</head>

<body>
  <div id="react-root">
  </div>
</body>
```

`client/main.js`
```js
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import App from '../imports/app.jsx';

Meteor.startup(() => {                                                                                                                                                              
  ReactDOM.render(<App/>, document.getElementById('react-root'));
});
```
- Now, get meteor to download the npm packages needed, `meteor npm install --save react react-dom d3`
- Then create the initial `<App />` component that will become the entry-point to all future react work
- To make sure it works, render an `h1` tag saying `Hello World!` in a new folder/file, `imports/app.jsx`

`imports/app.jsx`
```jsx
import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <h1>Hello World!</h1>
    );
  }
}
```
- If this works after a `meteor run` command, the page at the address [localhost:3000](http://localhost:3000) should now display `Hello World!`

## A Generic Chart Component
- Now lets start creating the main structure to the app that will use D3 & React together
- In `imports/app.jsx`, add an import for a new component that will be created to hold D3 charts called `Charts`
```jsx
import Chart from './chart.jsx';
```
- Now create a file, `chart.jsx` inside the same directory as `app.jsx` like below:

`imports/chart.jsx`
```jsx
import React       from 'react';
import ScatterPlot from './scatter-plot';

const styles = {
  width   : 500,
  height  : 300,
  padding : 30,
};

// The number of data points for the chart.
const numDataPoints = 50;

// A function that returns a random number from 0 to 1000
const randomNum     = () => Math.floor(Math.random() * 1000);

// A function that creates an array of 50 elements of (x, y) coordinates.
const randomDataSet = () => {
  return Array.apply(null, {length: numDataPoints}).map(() => [randomNum(), randomNum()]);
}

export default class Chart extends React.Component{
  constructor(props) {
    super(props);
    this.state = { data: randomDataSet() };
  }

  randomizeData() {
    this.setState({ data: randomDataSet() });
  }

  render() {
    return (
    <div>
      <ScatterPlot {...this.state} {...styles} />
      <div className="controls">
        <button className="btn randomize" onClick={() => this.randomizeData()}>
          Randomize Data
        </button>
      </div>
    </div>
    );
  }
}
```
*explanation*
- The chart component manages its own state
  - This is preferable because react is best used when it (or an addon like redux) manages the data flow of the virtual DOM
  - So all the state for a chart will then be stored inside the Chart component, which frames and handles all state of any D3 or other React stuff the lives inside it
- `ScatterPlot` is a soon-to-be-written component that will use D3 to draw a scatter plot
  - All the data to this plot, since this component will handle state, will need to be created, and in this case it's just randomized *(x, y)* coordinates
  - `randomNum` returns a random number from 0 to 1000
  - `randomDataSet` uses `randomNum` to return `numDataPoints` of *(x, y)* coordinates
- Inside the component class first state gets defined
  - the `constructor` sets the default state by storing a random set of *(x, y)* coordinates inside of state property, `state.data`
  - `state.data` gets updated by a function inside of the class, `randomizeData()` which will reuse `randomDataSet()` to load a newly randomized set of *(x, y)* coordinates
- Then finally, `render` will create HTML out of this component and its subordinate `<ScatterPlot>`
  - `<ScatterPlot>` is getting defined next
    - `<ScatterPlot>` will take this component's `state` so that it has the data to plot the scatter plot with
    - it will also take any style that gets defined for this chart as another prop
  - note the **scatter** operator `...` which basically just tells React to pass all of the state referenced into `<ScatterPlot>`
  - Then the only extra HTML that becomes visible at first, `<button>`, is given to be rendered
    - `<button>` is given a set of `className`s which will define styling rules later
    - it will also take a `onClick` react attribute which is an event listener that responds to clicking this button, and results in calling `randomizeData` which will change the state of the data passed into the plot, thus changing it
    - Because react only renders changes from the parent node down of the DOM, the change of state from clicking this button, will force React to render only this component and everything contained inside it
      - This is one of the major benefits of React, it's diffing of the virtual DOM against the real one being rendered onto the browser

## Combining React & D3 to Create A Scatter Plot Component
- In the previous javascript file, a `Chart` component was created to contain all the state and framing required to display and modify the subordinate D3 component inside it
- Now that state is being managed by React, it's time to pass that into D3 to properly process that data it gets, and draw a chart
- Create a new file, `imports/scatter-plot.jsx` and enter the below code:

`imports/scatter-plot.jsx`
```jsx
import React        from 'react';
import d3           from 'd3';
import DataCircles  from './data-circles';

// Returns the largest X coordinate from the data set
const xMax   = (data)  => d3.max(data, (d) => d[0]);

// Returns the higest Y coordinate from the data set
const yMax   = (data)  => d3.max(data, (d) => d[1]);

// Returns a function that "scales" X coordinates from the data to fit the chart
const xScale = (props) => {
  return d3.scale.linear()
    .domain([0, xMax(props.data)])
    .range([props.padding, props.width - props.padding * 2]);
};

// Returns a function that "scales" Y coordinates from the data to fit the chart
const yScale = (props) => {
  return d3.scale.linear()
    .domain([0, yMax(props.data)])
    .range([props.height - props.padding, props.padding]);
};

export default (props) => {
  const scales = { xScale: xScale(props), yScale: yScale(props) };
  return <svg width={props.width} height={props.height}>
    <DataCircles {...props} {...scales} />
  </svg>
}
```
**Explanation**
- Unlike before, since no state should ever be handled by D3, it's beneficial to write this component [functionally][2] instead of through object oriented classes
- **Note:** this exercise uses D3 version 3, and functions like `d3.scale.linear()` was changed along with quite a few other things in version 4, to `d3.scaleLinear()`
  - Either use the final version of D3v3 by importing through npm version `3.5.17` by entering `meteor npm install --save d3@3.5.17`...
  - ...or through a script tag, import from online this version
  - Also, the changes necessary to make this code run in version 4 could be used, but it won't be covered here
- Firstly, in this component, there are 4 functions concerned with scaling the plot according to the maximum value of the data that's been passed
  - `xMax`, `yMax`, `xScale`, `yScale` are these functions
  - they use `d3.max` to find the largest value
  - `d3.scale.linear` to scale the plot according to not just the maximum values, but also according to the padding and height/width of the parent component
  - `domain` is short for *input domain*, meaning the range of possible input values that can be displayed
  - `range` is the *output range*, and it defines the range of possible output values
- In functional react, `export default (props) => {}` simply returns components & tags defined inside the arrow function, and includes the passed `props` in how those components are rendered
- React is now handling and binding all the data, D3 is simply doing the math on that data, because D3 is much better at this than React
- Finally, another react component is passed, that will actually draw the data itself, as circles on the plot, `<DataCircles>`

## References
[1]: https://github.com/freddyrangel/playing-with-react-and-d3
[2]: https://medium.com/missive-app/45-faster-react-functional-components-now-3509a668e69f

1. [Playing with React & D3 by Freddie Rangel][1]
2. [Faster Functional Components in React by Philippe Lehoux][2]
