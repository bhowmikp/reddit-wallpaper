import React, { useState } from "react";

const DashboardCard = ({ entry }) => {
  const [displayStatus, setDisplayStatus] = useState(true);

  return displayStatus === true ? (
    <div key={entry.id}>
      <img
        src={entry.url}
        alt={entry.title}
        onError={() => setDisplayStatus(false)}
        width="100%"
      />
      <p>{entry.title}</p>
    </div>
  ) : null;
};

export default DashboardCard;
