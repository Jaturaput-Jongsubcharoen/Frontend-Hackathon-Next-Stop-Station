import React, { useEffect, useState } from "react";
import axios from "axios";
import DriverTopbar from "./DriverTopbar";
import DriverBatteryCard from "./DriverBatteryCard";
import FleetLogoBlack from "../images/FleetLogo-BrowserTabIcon-black.png";

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
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8fafc",
        }}
      >
        <img
          src={FleetLogoBlack}
          alt="FleetZero Error"
          style={{
            width: "150px",
            height: "auto",
            animation: "fadePulse 2s ease-in-out infinite",
          }}
        />
        <p
          style={{
            marginTop: "16px",
            fontSize: "16px",
            color: "#333",
            fontWeight: 600,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Cannot load vehicle data.
        </p>
        <p
          style={{
            marginTop: "4px",
            fontSize: "14px",
            color: "#666",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {error}
        </p>
      </div>
    );

  if (!busData)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8fafc",
        }}
      >
        <img
          src={FleetLogoBlack}
          alt="FleetZero Loading"
          style={{
            width: "150px",
            height: "auto",
            animation: "fadePulse 2s ease-in-out infinite",
          }}
        />
        <p
          style={{
            marginTop: "16px",
            fontSize: "16px",
            color: "#333",
            fontWeight: 600,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Loading Driver Dashboard...
        </p>
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
