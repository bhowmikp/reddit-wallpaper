import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
const { ipcRenderer } = require("electron");

const Filter = ({
  sortBy,
  time,
  limit,
  setSortBy,
  setTime,
  setLimit,
  setData
}) => {
  const sortByOptions = ["Hot", "Top", "New"];
  const timeOptions = ["Hour", "Day", "Week", "Month", "Year", "All"];
  const limitOptions = [5, 10, 15, 20, 25, 50];

  const fetchData = async newParams => {
    setData(JSON.parse(await ipcRenderer.invoke("get-data", newParams)));
  };

  return (
    <div>
      <select
        value={sortBy}
        onChange={e => {
          setSortBy(e.target.value);
          fetchData({ sortBy: e.target.value, time: time, limit: limit });
        }}
      >
        {sortByOptions.map(entry => {
          return (
            <option
              key={entry}
              value={entry.toLowerCase()}
              defaultValue={entry === "Hot"}
            >
              {entry}
            </option>
          );
        })}
      </select>

      <select
        value={time}
        onChange={e => {
          setTime(e.target.value);
          fetchData({ sortBy: sortBy, time: e.target.value, limit: limit });
        }}
        disabled={sortBy !== "top"}
      >
        {timeOptions.map(entry => {
          return (
            <option
              key={entry}
              value={entry.toLowerCase()}
              defaultValue={entry === "Week"}
            >
              {entry}
            </option>
          );
        })}
      </select>

      <select
        value={limit}
        onChange={e => {
          setLimit(e.target.value);
          fetchData({ sortBy: sortBy, time: time, limit: e.target.value });
        }}
      >
        {limitOptions.map(entry => {
          return (
            <option
              key={entry}
              value={Number.parseInt(entry)}
              defaultValue={Number.parseInt(entry) === 25}
            >
              {entry}
            </option>
          );
        })}
      </select>
    </div>
  );
};

const Dashboard = () => {
  const [data, setData] = useState({});
  const [sortBy, setSortBy] = useState("hot");
  const [time, setTime] = useState("week");
  const [limit, setLimit] = useState(25);

  const fetchDataInitial = async () => {
    setData(
      JSON.parse(
        await ipcRenderer.invoke("get-data", {
          sortBy: sortBy,
          time: time,
          limit: limit
        })
      )
    );
  };

  if (isEmpty(data)) {
    fetchDataInitial();
  }

  return (
    <div>
      <Filter
        sortBy={sortBy}
        time={time}
        limit={limit}
        setSortBy={setSortBy}
        setTime={setTime}
        setLimit={setLimit}
        setData={setData}
      />
      {isEmpty(data) ? (
        <p>Searching...</p>
      ) : (
        data.map(entry => {
          return (
            <div key={entry.id}>
              <img src={entry.url} alt={entry.title} width="100%" />
              <p>{entry.title}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Dashboard;
