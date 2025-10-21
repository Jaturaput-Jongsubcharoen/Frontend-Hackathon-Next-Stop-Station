import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

function BusSelector({ onBusSelect }) {
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const [error, setError] = useState(null);

  // Fetch bus list from backend
  const fetchBuses = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BE_URL}/api/battery`, {
        withCredentials: true,
      });

      const data = response.data.buses;
      setBuses(data);
      console.log("Fetched bus data:", data);
    } catch (err) {
      console.error("Error fetching buses:", err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const handleSelectBus = (bus) => {
    setSelectedBus(bus.id);
    onBusSelect(bus);
  };

  if (error)
    return (
      <div className="bus-selector">
        <h3>Error loading buses</h3>
        <p>{error}</p>
      </div>
    );

  if (buses.length === 0)
    return (
      <div className="bus-selector">
        <h3>Loading Buses...</h3>
      </div>
    );

  return (
    <div className="bus-selector">
      <h3>Select Bus:</h3>
      <div className="bus-buttons">
        {buses.map((bus) => (
          <button
            key={bus.id}
            className={`bus-button 
              ${bus.status === "offline" ? "maintenance" : bus.condition} 
              ${selectedBus === bus.id ? "active" : ""}`}
            onClick={() => handleSelectBus(bus)}
          >
            {bus.id}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BusSelector;
