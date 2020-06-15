import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import { DatabaseService } from "../Service/DatabaseService";
import ImageCard from "../Shared/ImageCard";

const Favourites = () => {
  const [data, setData] = useState({});
  const databaseService = new DatabaseService();
  let [shouldCheck, setShouldCheck] = useState(true);

  if (shouldCheck === true && isEmpty(data)) {
    setShouldCheck(false);
    setData(databaseService.getFavourite());
  }

  return (
    <div>
      {isEmpty(data) ? (
        <p>Searching...</p>
      ) : (
        <div>
          {Object.entries(data).map(entry => {
            return <ImageCard entry={entry[1]} key={entry[1].id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Favourites;
