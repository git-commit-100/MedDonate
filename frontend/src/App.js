import { useState } from "react";

function App() {
  const [data, setData] = useState("Null");

  async function fetchData() {
    // endpoint for server
    const response = await fetch("http://localhost:8080");

    const body = await response.json();

    setData(body.response.toString());
  }

  return (
    <div className="App">
      <h2 className="response">{data}</h2>
      <br />
      <button onClick={fetchData}>Get Data</button>
    </div>
  );
}

export default App;
