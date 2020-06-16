import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  }
}));

const Search = ({ formik, fetchData }) => {
  const classes = useStyles();
  const [searchTerms, setSearchTerms] = useState(
    formik.values.subreddits.join("+")
  );

  const submit = () => {
    formik.setFieldValue("subreddits", searchTerms.split("+"));
    fetchData();
  };

  return (
    <div>
      <Paper
        component="form"
        className={classes.root}
        onSubmit={e => {
          e.preventDefault();
          submit();
        }}
      >
        <InputBase
          className={classes.input}
          value={searchTerms}
          onKeyPress={e => {
            if (e.key === "Enter") {
              submit();
            }
          }}
          onChange={e => {
            setSearchTerms(e.target.value);
          }}
          placeholder="Search Subreddits..."
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      <Typography
        variant="body2"
        color="textSecondary"
        component="p"
        style={{ paddingBottom: "10px" }}
      >
        Use "+" to search in multiple subreddits
      </Typography>
    </div>
  );
};

export default Search;
