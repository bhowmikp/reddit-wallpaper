import React, { useState } from "react";
import isEmpty from "lodash/isEmpty";
const { ipcRenderer } = require("electron");

function App() {
  const [data, setData] = useState({});

  const getData = async () => {
    setData(await ipcRenderer.invoke("get-data-hot"));
  };

  if (isEmpty(data)) {
    getData();
  }

  return (
    <div className="App">
      {isEmpty(data) ? (
        <p>Searching...</p>
      ) : (
        data.map(entry => {
          return (
            <div key={entry.id}>
              <img src={entry.url} alt={entry.title} width="100%" />
              <p>{entry.title}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default App;
