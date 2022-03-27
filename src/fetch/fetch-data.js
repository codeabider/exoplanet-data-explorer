import { csvParse } from "d3";

const fetchData = async (url) => {
  const response = await fetch(url);

  return await response.text();
};

const parseCSVData = (data) => csvParse(data);

export { fetchData, parseCSVData };
