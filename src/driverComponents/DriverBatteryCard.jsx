import React, { useEffect, useState } from "react";
import "../components/BatteryCard.css";

function DriverBatteryCard({ busId = "Bus 101" }) { 
  const [busData, setBusData] = useState(null);

  const backendURL = import.meta.env.VITE_BE_URL;

  useEffect(() => {
    const fetchFleetData = async () => {
      try {
        const response = await fetch(`${backendURL}/api/battery`);
        const data = await response.json();

        const selectedBus = data.buses.find((b) => b.id === busId);
        setBusData(selectedBus);
      } catch (error) {
        console.error("Error fetching fleet data:", error);
      }
    };

    fetchFleetData();
  }, [backendURL, busId]);

  if (!busData) {
    return <p>Loading bus data...</p>;
  }

  const processBatteryData = (rawData) => {
    if (!rawData) return {};
    const soc = Math.min(100, Math.max(0, Math.round(rawData.soc || 0)));
    const soh = Math.min(100, Math.max(0, Math.round(rawData.soh || 0)));
    const voltage = parseFloat(rawData.voltage?.toFixed(1)) || 0;
    const current = parseFloat(rawData.current?.toFixed(1)) || 0;
    const temperature = parseFloat(rawData.temperature?.toFixed(1)) || 0;
    const cycles = rawData.cycles || 0;
    const healthScore = Math.min(100, Math.max(0, rawData.healthScore || 0));
    return { ...rawData, soc, soh, voltage, current, temperature, cycles, healthScore };
  };

  const getConditionText = (status, condition) => {
    if (status === "offline") return "MAINTENANCE";
    if (condition === "critical") return "CRITICAL";
    if (condition === "warning") return "WARNING";
    return "HEALTHY";
  };

  const getConditionClass = (status, condition) => {
    if (status === "offline") return "offline";
    if (condition === "critical") return "critical";
    if (condition === "warning") return "warning";
    return "healthy";
  };

  const getStatusColor = (status, condition) => {
    if (status === "offline") return "#9E9E9E";
    if (condition === "critical") return "#E53935";
    if (condition === "warning") return "#FFC107";
    return "#4CAF50";
  };

  const processedData = processBatteryData(busData);
  const conditionText = getConditionText(processedData.status, processedData.condition);
  const conditionClass = getConditionClass(processedData.status, processedData.condition);
  const statusColor = getStatusColor(processedData.status, processedData.condition);

  return (
    <div className="card battery-card">
      <h2>Battery Health Status - {processedData.id}</h2>

      <div className="battery-stats">
        <ul>
          <li>State of Charge (SoC): <span>{processedData.soc}%</span></li>
          <li>State of Health (SoH): <span>{processedData.soh}%</span></li>
          <li>Charge Cycles: <span>{processedData.cycles}</span></li>
        </ul>
      </div>

      <div className="health-section">
        <h3>AI-Predicted Health Score</h3>

        <div className={`health-circle ${conditionClass}`}>
          <div className="score">{processedData.healthScore}</div>
        </div>

        <p className="health-status" style={{ color: statusColor }}>
          {conditionText}
        </p>
      </div>
    </div>
  );
}

export default DriverBatteryCard;
