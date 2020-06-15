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
import WallpaperIcon from "@material-ui/icons/Wallpaper";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Tooltip from "@material-ui/core/Tooltip";
import { DatabaseService } from "../Service/DatabaseService";

const { shell } = require("electron");

const useStyles = makeStyles(theme => ({
  root: {
    maxHeight: "100%",
    marginBottom: 1
  },
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

const ImageCard = ({ entry }) => {
  const databaseService = new DatabaseService();

  const classes = useStyles();
  const [displayStatus, setDisplayStatus] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [favouriteStatus, setFavouriteStatus] = useState(
    databaseService.hasFavourite(entry)
  );

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
        {favouriteStatus ? (
          <div>
            <Tooltip title="Remove favourite">
              <IconButton
                aria-label="remove favourite"
                onClick={e => {
                  databaseService.deleteFavourite(entry);
                  setFavouriteStatus(databaseService.hasFavourite(entry));
                }}
              >
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <div>
            <Tooltip title="Add favourite">
              <IconButton
                aria-label="add to favorites"
                onClick={e => {
                  databaseService.setFavourite(entry);
                  setFavouriteStatus(databaseService.hasFavourite(entry));
                }}
              >
                <FavoriteBorder />
              </IconButton>
            </Tooltip>
          </div>
        )}

        <Tooltip title="Set Wallpaper">
          <IconButton aria-label="wallpaper">
            <WallpaperIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Expand/Collapse Content">
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
        </Tooltip>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>
            Author:{" "}
            <a
              href={`https://reddit.com/user/${entry.author}`}
              onClick={e => {
                e.preventDefault();
                shell.openExternal(`https://reddit.com/user/${entry.author}`);
              }}
            >
              {entry.author}
            </a>
          </Typography>

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

export default ImageCard;
