import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
import { DatabaseService } from "../Service/DatabaseService";
import ImageCard from "../Shared/ImageCard";
import Scroll from "../Shared/Scroll";

const Favourites = () => {
  const [data, setData] = useState({});
  const [resultsNumber, setResultsNumber] = useState(0);
  const databaseService = new DatabaseService();
  const [shouldCheck, setShouldCheck] = useState(true);

  if (shouldCheck === true && isEmpty(data)) {
    setShouldCheck(false);
    setData(databaseService.getFavourite());
    setResultsNumber(databaseService.getFavouriteCount());
  }

  return (
    <div>
      {isEmpty(data) ? (
        <p>Found {resultsNumber} results</p>
      ) : (
        <div>
          <p>Found {resultsNumber} results</p>
          {Object.entries(data).map(entry => {
            return <ImageCard entry={entry[1]} key={entry[1].id} />;
          })}
        </div>
      )}

      <Scroll />
    </div>
  );
};

export default Favourites;
