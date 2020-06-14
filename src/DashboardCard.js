import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const { shell } = require("electron");

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: "100%",
    marginBottom: 1
  },
  media: {},
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));

const DashboardCard = ({ entry }) => {
  const classes = useStyles();
  const [displayStatus, setDisplayStatus] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return displayStatus === true ? (
    <Card className={classes.root}>
      <CardActionArea>
        <CardHeader
          title={entry.title}
          subheader={new Date(entry.created * 1000).toDateString()}
        />

        <CardMedia
          className={classes.media}
          src={entry.url}
          title={entry.title}
          component="img"
          onError={e => {
            setDisplayStatus(false);
          }}
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Subreddit: {entry.subreddit}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>Author: {entry.author}</Typography>
          <Typography>
            Comments:{" "}
            <a
              href={`https://reddit.com${entry.permalink}`}
              onClick={e => {
                e.preventDefault();
                shell.openExternal(`https://reddit.com${entry.permalink}`);
              }}
            >
              Link
            </a>
          </Typography>
          <Typography>Upvote Ratio: {entry.upvote_ratio}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  ) : null;
};

export default DashboardCard;
