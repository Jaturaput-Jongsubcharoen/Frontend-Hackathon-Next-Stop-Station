import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [fruits, setFruits] = useState([]);

  const fetchAPI = async () => {
    try {
      const response = await axios.get("http://localhost:8084/api", {
        withCredentials: true,
      });
      const data = response.data.fruits;
      setFruits(data);
      console.log("Fetched fruits:", data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      {/* Show fetched data */}
      <p className="read-the-docs">
        Fruits: {fruits.length > 0 ? fruits.join(", ") : "Loading..."}
      </p>
    </>
  );
}

export default App;
