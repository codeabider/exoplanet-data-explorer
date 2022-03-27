const getNumericAttributes = (csvData) =>
    Object.keys(csvData[0]).filter((keyName) => !isNaN(csvData[0][keyName]));

const getGraphAttributes = (xArr, yArr) => {
  const xArrMax = Math.ceil(Math.max(...xArr));
  const xMaxDigitCount = (Math.log(xArrMax) * Math.LOG10E + 1) | 0;
  const xTickCount = xArrMax / Math.pow(10, xMaxDigitCount - 2);

  const yArrMax = Math.ceil(Math.max(...yArr));
  const yMaxDigitCount = (Math.log(yArrMax) * Math.LOG10E + 1) | 0;
  const yTickCount = yArrMax / Math.pow(10, yMaxDigitCount - 1.5);

  return { xArrMax, xTickCount, yArrMax, yTickCount };
};

export { getGraphAttributes, getNumericAttributes };
