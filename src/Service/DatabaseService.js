const Store = require("electron-store");

export class DatabaseService {
  constructor() {
    this.store = new Store();
  }

  setFavourite(entry) {
    this.store.set(`favourites.${entry.id}`, entry);
  }

  deleteFavourite(entry) {
    this.store.delete(`favourites.${entry.id}`);
  }

  getFavourite() {
    return this.store.get("favourites");
  }

  hasFavourite(entry) {
    return this.store.has(`favourites.${entry.id}`);
  }

  getFavouriteCount() {
    return Object.keys(this.store.get("favourites")).length;
  }
}
