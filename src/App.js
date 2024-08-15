import React, { useState, useEffect } from "react";
import axios from "axios";
function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const username = "developer";
        // const password = "Developer@123";
        // const basicAuth = `Basic ${btoa(`${username}:${password}`)}`;
        const auth = btoa("developer:Developer@123");
        await axios
          .get("https://training.dhis2.udsm.ac.tz/dhis-web-login", {
            headers: {
              Authorization: `Basic ${auth}`,
            },
          })
          .then((r) => {
            console.log(r.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return <div>hello</div>;
}

export default App;
