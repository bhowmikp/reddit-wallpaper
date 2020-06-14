import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import { useFormik } from "formik";
import DashboardCard from "./DashboardCard";

const { ipcRenderer } = require("electron");

const Filter = ({ formik, setData }) => {
  const sortByOptions = ["Hot", "Top", "New"];
  const timeOptions = ["Hour", "Day", "Week", "Month", "Year", "All"];
  const limitOptions = [5, 10, 15, 20, 25, 50];

  const fetchData = async newParams => {
    setData(JSON.parse(await ipcRenderer.invoke("get-data", newParams)));
  };

  return (
    <div>
      <select
        value={formik.values.sortBy}
        onChange={e => {
          formik.values.sortBy = e.target.value;
          fetchData({
            sortBy: e.target.value,
            time: formik.values.time,
            limit: formik.values.limit
          });
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
        value={formik.values.time}
        onChange={e => {
          formik.values.time = e.target.value;
          fetchData({
            sortBy: formik.values.sortBy,
            time: e.target.value,
            limit: formik.values.limit
          });
        }}
        disabled={formik.values.sortBy !== "top"}
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
        value={formik.values.limit}
        onChange={e => {
          formik.values.limit = e.target.value;
          fetchData({
            sortBy: formik.values.sortBy,
            time: formik.values.time,
            limit: e.target.value
          });
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

  const formik = useFormik({
    initialValues: {
      sortBy: "hot",
      time: "week",
      limit: 25
    }
  });

  const fetchDataInitial = async () => {
    setData(
      JSON.parse(
        await ipcRenderer.invoke("get-data", {
          sortBy: formik.values.sortBy,
          time: formik.values.time,
          limit: formik.values.limit
        })
      )
    );
  };

  if (isEmpty(data)) {
    fetchDataInitial();
  }

  return (
    <div>
      <Filter formik={formik} setData={setData} />
      {isEmpty(data) ? (
        <p>Searching...</p>
      ) : (
        data.map(entry => {
          return <DashboardCard entry={entry} />;
        })
      )}
    </div>
  );
};

export default Dashboard;
