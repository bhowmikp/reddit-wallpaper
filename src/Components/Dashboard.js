import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import { useFormik } from "formik";
import ImageCard from "../Shared/ImageCard";
import Scroll from "../Shared/Scroll";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Search from "./Search";
import Grid from "@material-ui/core/Grid";

const { ipcRenderer } = require("electron");

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

const Filter = ({ formik, setData }) => {
  const classes = useStyles();

  const sortByOptions = ["Hot", "Top", "New"];
  const timeOptions = ["Hour", "Day", "Week", "Month", "Year", "All"];
  const limitOptions = [5, 10, 15, 20, 25, 50];

  const fetchData = async newParams => {
    setData(JSON.parse(await ipcRenderer.invoke("get-data", newParams)));
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={formik.values.sortBy}
          onChange={e => {
            formik.values.sortBy = e.target.value;
            fetchData({
              ...formik.values,
              sortBy: e.target.value
            });
          }}
        >
          {sortByOptions.map(entry => {
            return (
              <MenuItem key={entry} value={entry.toLowerCase()}>
                {entry}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel>Time</InputLabel>
        <Select
          value={formik.values.time}
          onChange={e => {
            formik.values.time = e.target.value;
            fetchData({
              ...formik.values,
              time: e.target.value
            });
          }}
          disabled={formik.values.sortBy !== "top"}
        >
          {timeOptions.map(entry => {
            return (
              <MenuItem key={entry} value={entry.toLowerCase()}>
                {entry}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel>Limit</InputLabel>
        <Select
          value={formik.values.limit}
          onChange={e => {
            formik.values.limit = e.target.value;
            fetchData({
              ...formik.values,
              limit: e.target.value
            });
          }}
        >
          {limitOptions.map(entry => {
            return (
              <MenuItem key={entry} value={Number.parseInt(entry)}>
                {entry}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

const Dashboard = () => {
  const [data, setData] = useState({});

  const formik = useFormik({
    initialValues: {
      sortBy: "hot",
      time: "week",
      limit: 25,
      subreddits: ["wallpapers"]
    }
  });

  const fetchData = async () => {
    setData(
      JSON.parse(
        await ipcRenderer.invoke("get-data", {
          ...formik.values
        })
      )
    );
  };

  if (isEmpty(data)) {
    fetchData();
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6} style={{ paddingTop: "15px" }}>
          <Search formik={formik} fetchData={fetchData} />
        </Grid>
        <Grid item xs={6} id="dashboardFilter">
          <Filter formik={formik} setData={setData} />
        </Grid>
      </Grid>
      <Scroll />

      {isEmpty(data) ? (
        <p>Searching...</p>
      ) : (
        data.map(entry => {
          return <ImageCard entry={entry} key={entry.id} />;
        })
      )}
    </div>
  );
};

export default Dashboard;
