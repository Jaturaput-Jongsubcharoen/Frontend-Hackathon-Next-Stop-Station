import React, { useEffect, useState } from "react";
import axios from "axios";
import DriverTopbar from "./DriverTopbar";
import DriverBatteryCard from "./DriverBatteryCard";

function DriverMonitorDashboard() {
  const [busData, setBusData] = useState(null);
  const [error, setError] = useState(null);

  const fetchBusData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BE_URL}/api/battery`,
        { withCredentials: true }
      );
      const allBuses = response.data.buses;
      const activeBus =
        allBuses.find((b) => b.status === "active") || allBuses[0];
      setBusData(activeBus);
    } catch (err) {
      console.error("Error fetching bus data:", err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchBusData();
  }, []);

  if (error)
    return (
      <div className="error">
        <h2>Cannot load vehicle data</h2>
        <p>{error}</p>
      </div>
    );

  if (!busData)
    return (
      <div className="loading">
        <h2>Loading Driver Dashboard...</h2>
      </div>
    );

  return (
    <div className="dashboard">

      <DriverTopbar busData={busData} />

      <div className="dashboard-header">
        <h1 className="dashboard-title">DRIVER VEHICLE MONITOR</h1>
      </div>

      <div className="grid">
        <DriverBatteryCard busData={busData} />
      </div>
    </div>
  );
}

export default DriverMonitorDashboard;
