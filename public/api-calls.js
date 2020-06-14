require("dotenv").config();
const snoowrap = require("snoowrap");

class Reddit {
  constructor() {
    this.r = new snoowrap({
      userAgent: "Hope you enjoy the app",
      clientId: process.env.CLIENT_ID,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: process.env.ACCESS_TOKEN
    });
  }

  async getData(params) {
    const sortBy = params.sortBy === undefined ? "hot" : params.sortBy;
    const subreddits =
      params.subreddits === undefined ? ["wallpapers"] : params.subreddits;
    const time = params.time === undefined ? "week" : params.time;
    const limit = params.limit === undefined ? 10 : params.limit;

    const subredditData = this.r.getSubreddit(subreddits.join("+"));

    switch (sortBy) {
      case "hot":
        return await subredditData.getHot({ time: time, limit: limit });
      case "top":
        return await subredditData.getTop({ time: time, limit: limit });
      case "new":
        return await subredditData.getNew({ time: time, limit: limit });
      default:
        return await subredditData.getHot();
    }
  }
}

module.exports = {
  Reddit: Reddit
};
