// Enum types
export const RandomDataType = {
  LINSPACE: 0,
  SCATTER: 1,
  KEYED_LINSPACE: 2,
};

const ascendingLinSpace = (max, min = 0, interval = 1) => (
  // Math.floor((max - min) / interval), (val, idx) => (interval * idx) + min)
  // TODO: Change so it reflects (interval * idx) + min
  Array(...{ length: (Math.floor((max - min) / interval)) }).map(Number.call, Number)
);

// A function that returns a random number from 0 to 1000
const randomNum = (min, max) => Math.floor(min + (Math.random() * max));

// A function that returns an array of random numbers of min & max values of count
const randomArray = (count, min = 0.0, max = 1.0) =>
  Array.from(new Array(count), () => randomNum(min, max));

// A function that creates an array of 50 elements of (x, y) coordinates.
const randomScatter = count => (
  Array.from(new Array(count), () => [randomNum(0, 1000), randomNum(0, 1000)])
);

// Create a time series (equi-spaced independent axis) with random dependant axis
const randomLinSpace = count => (
  Array.from(new Array(count), (val, index) => [index, randomNum(0, 1000)])
);

const keyedLinSpaceEntry = (num, keys) => {
  const keyedRandData = {};
  keys.forEach((key, keyIndex) => {
    keyedRandData[key] =
      (keyIndex === 0) ? ascendingLinSpace(num) : randomArray(num, 0, 1000);
  });
  return keyedRandData;
};

const keyedLinSpace = (count, keys) => Array.from(new Array(count), (val, index) => []);

export const randomData = (num, dataSetType, keys) => {
  const validatedKeys = (typeof keys !== 'undefined') ? keys : ['time', 'data'];
  if (dataSetType === RandomDataType.LINSPACE) {
    return randomLinSpace(num);
  } else if (dataSetType === RandomDataType.SCATTER) {
    return randomScatter(num);
  } else if (dataSetType === RandomDataType.KEYED_LINSPACE) {
    return keyedLinSpace(num, validatedKeys);
  }
  return undefined;
};
