// Enum types
export const RandomDataType = {
  LINSPACE: 'linspace',
  SCATTER: 'scatter',
};

// A function that returns a random number from 0 to 1000
const randomNum = () => Math.floor(Math.random() * 1000);

// A function that creates an array of 50 elements of (x, y) coordinates.
const randomScatter = num => (
  Array.from(new Array(num), () => [randomNum(), randomNum()])
);

// Create a time series (equi-spaced independent axis) with random dependant axis
const randomLinSpace = num => (
  Array.from(new Array(num), (val, index) => [index, randomNum()])
);

export const randomData = (num, dataSetType) => {
  if (dataSetType === RandomDataType.LINSPACE) {
    return randomLinSpace(num);
  } else if (dataSetType === RandomDataType.SCATTER) {
    return randomScatter(num);
  }
  return undefined;
};
