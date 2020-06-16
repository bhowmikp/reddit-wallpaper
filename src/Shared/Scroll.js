import React from "react";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

const Scroll = () => {
  const classes = useStyles();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Fab
        variant="extended"
        style={{ position: "fixed", zIndex: "1", bottom: "5%", right: "5%" }}
        onClick={e => scrollToTop()}
      >
        <NavigationIcon className={classes.extendedIcon} />
        Scroll to Top
      </Fab>
    </div>
  );
};

export default Scroll;
