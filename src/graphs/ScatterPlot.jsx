import { useEffect, useRef } from "react";
import * as d3 from "d3";

const ScatterPlot = ({
  data,
  dimensions,
  xMaxScale = 10,
  xTicks = 100,
  yMaxScale = 10,
  yTicks = 100,
}) => {
  const svgRef = useRef();

  // setup container
  const { width, height } = dimensions;
  const svgWidth = width;
  const svgHeight = height;

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .style("overflow", "visible")
      .style("margin", "40px");

    // setup scaling
    const xScale = d3.scaleLinear().domain([0, xMaxScale]).range([0, svgWidth]);
    const yScale = d3
      .scaleLinear()
      .domain([0, yMaxScale])
      .range([svgHeight, 0]);

    // setup axis
    const xAxis = d3.axisBottom(xScale).ticks(xTicks);
    const yAxis = d3.axisLeft(yScale).ticks(yTicks);

    svg.append("g").call(xAxis).attr("transform", `translate(0, ${svgHeight})`);
    svg.append("g").call(yAxis);

    // setup axis labeling
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height + 50)
      .text("x");
    svg
      .append("text")
      .attr("y", height / 2)
      .attr("x", -50)
      .text("y");

    // setup svg data
    svg
      .selectAll()
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d[0]))
      .attr("cy", (d) => yScale(d[1]))
      .attr("r", 3);
  }, [data]);

  return <svg ref={svgRef} />;
};

export default ScatterPlot;
