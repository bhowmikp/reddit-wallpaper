const Store = require("electron-store");

export class DatabaseService {
  constructor() {
    this.store = new Store();
  }

  setFavourite(entry) {
    this.store.set(`favourites.${entry.permalink}`, entry);
  }

  deleteFavourite(entry) {
    this.store.delete(`favourites.${entry.permalink}`);
  }

  getFavourite() {
    console.log("GET FAVOURITE");
    return this.store.get("favourites");
  }

  hasFavourite(entry) {
    return this.store.has(`favourites.${entry.permalink}`);
  }
}
