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

  async getHot(subreddits = ["wallpapers"], time = "week", limit = 10) {
    return await this.r
      .getSubreddit(subreddits.join("+"))
      .getHot({ time: time, limit: limit });
  }

  async getTop(subreddits = ["wallpapers"], time = "week", limit = 10) {
    return await this.r
      .getSubreddit(subreddits.join("+"))
      .getTop({ time: time, limit: limit });
  }

  async getNew(subreddits = ["wallpapers"], time = "week", limit = 10) {
    return await this.r
      .getSubreddit(subreddits.join("+"))
      .getNew({ time: time, limit: limit });
  }
}

module.exports = {
  Reddit: Reddit
};
