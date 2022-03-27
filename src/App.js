import { useEffect, useState } from "react";

import ErrorMessage from "./elements/ErrorMessage";
import DropDown from "./elements/DropDown";
import ScatterPlot from "./graphs/ScatterPlot";

import { fetchData, parseCSVData } from "./fetch/fetch-data";

import { CSV_PATH } from "./constants/file-paths";

import "./App.scss";

const GRAPH_DIMENSIONS = { width: 1000, height: 750 };
const DEFAULT_X = "P. Mass (EU)";
const DEFAULT_Y = "P. Gravity (EU)";

/*
  TODOs:
    clear graph and populate new values
    update graph ticks, range, etc dynamically ** (x)
    use memoisation
    document
    use queue?
    basic styling
    separation of concerns - basic scatter graph component, dropdown, button components (x)
    states (x)
    use appropriate key prop (x)
    separate React rendering logic from graphing logic (x)
    default selected/ populated (x)
*/

const App = () => {
  const [allData, setAllData] = useState([]);
  const [exoPlanetData, setExoPlanetData] = useState([]);
  const [xLabel, setXLabel] = useState(DEFAULT_X);
  const [yLabel, setYLabel] = useState(DEFAULT_Y);
  const [xMaxScale, setXMaxScale] = useState(0);
  const [yMaxScale, setYMaxScale] = useState(0);
  const [xTicks, setXTicks] = useState(0);
  const [yTicks, setYTicks] = useState(0);
  const [numericAttributes, setNumericAttributes] = useState([]);

  const getSelectedScatterPlotData = (csvData, x, y) => {
    const xArr = [];
    const yArr = [];

    const selectedScatterPlotData = csvData.map((obj) => {
      xArr.push(obj[x]);
      yArr.push(obj[y]);

      return [obj[x], obj[y]];
    });

    return { selectedScatterPlotData, xArr, yArr };
  };

  const getGraphAttributes = (xArr, yArr) => {
    const xArrMax = Math.ceil(Math.max(...xArr));
    const xMaxDigitCount = (Math.log(xArrMax) * Math.LOG10E + 1) | 0;
    const xTickCount = xArrMax / Math.pow(10, xMaxDigitCount - 2);

    const yArrMax = Math.ceil(Math.max(...yArr));
    const yMaxDigitCount = (Math.log(yArrMax) * Math.LOG10E + 1) | 0;
    const yTickCount = yArrMax / Math.pow(10, yMaxDigitCount - 1.5);

    return { xArrMax, xTickCount, yArrMax, yTickCount };
  };

  const getNumericAttributes = (csvData) =>
    Object.keys(csvData[0]).filter((keyName) => !isNaN(csvData[0][keyName]));

  const axesSelected = (axis, value) => {
    if (axis === "x") setXLabel(value);
    if (axis === "y") setYLabel(value);
  };

  useEffect(() => {
    fetchData(CSV_PATH).then((data) => {
      const csvData = parseCSVData(data);

      setAllData(csvData);
      setNumericAttributes(getNumericAttributes(csvData));
    });
  }, []);

  useEffect(() => {
    const { selectedScatterPlotData, xArr, yArr } = getSelectedScatterPlotData(
      allData,
      xLabel,
      yLabel
    );
    setExoPlanetData(selectedScatterPlotData);

    const { xArrMax, xTickCount, yArrMax, yTickCount } = getGraphAttributes(
      xArr,
      yArr
    );
    setXMaxScale(xArrMax);
    setXTicks(xTickCount);
    setYMaxScale(yArrMax);
    setYTicks(yTickCount);
  }, [allData, xLabel, yLabel]);

  return (
    <section className="main-container">
      <div className="selection-container">
        <DropDown
          axis="x"
          data={numericAttributes}
          doChange={(event) => axesSelected("x", event.target.value)}
          label={xLabel}
          value={xLabel || DEFAULT_X}
        />
        <DropDown
          axis="y"
          data={numericAttributes}
          doChange={(event) => axesSelected("y", event.target.value)}
          label={yLabel}
          value={yLabel || DEFAULT_Y}
        />
      </div>
      <section className="graph-container">
        {!xLabel || !yLabel || !exoPlanetData.length ? (
          <ErrorMessage>Please select both axes</ErrorMessage>
        ) : (
          <ScatterPlot
            data={exoPlanetData}
            dimensions={GRAPH_DIMENSIONS}
            xMaxScale={xMaxScale}
            xTicks={xTicks}
            yMaxScale={yMaxScale}
            yTicks={yTicks}
          />
        )}
      </section>
    </section>
  );
};

export default App;
