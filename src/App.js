import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [dataElements, setDataElements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = "developer";
        const password = "Developer@123";
        const auth = window.btoa(`${username}:${password}`);
        const response = await axios.get(
          "/api/dataElements.json?fields=id,name,formName,valueType,domainType&filter=domainType:eq:AGGREGATE",
          {
            headers: {
              Authorization: `Basic ${auth}`,
            },
          }
        );
        setDataElements(response.data.dataElements);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return <DataTable dataElements={dataElements} />;
}

function DataTable({ dataElements }) {
  const [values, setValues] = useState({});

  const handleChange = (id, value) => {
    setValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Data element name</th>
          <th>Value</th>
          <th>Percent = (Value/40)*100</th>
        </tr>
      </thead>
      <tbody>
        {dataElements.map((element) => (
          <tr key={element.id}>
            <td>{element.name}</td>
            <td>
              <input
                type="number"
                value={values[element.id] || ""}
                onChange={(e) => handleChange(element.id, e.target.value)}
              />
            </td>
            <td>
              {values[element.id]
                ? ((values[element.id] / 40) * 100).toFixed(2)
                : ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default App;
