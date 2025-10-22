import React from "react";
import "./BatteryCard.css";

function BatteryCard({ data }) {
  // Standardize and sanitize numeric fields
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

  // Determine readable condition text
  const getConditionText = (status, condition) => {
    if (status === "offline") return "MAINTENANCE";
    if (condition === "critical") return "CRITICAL";
    if (condition === "warning") return "WARNING";
    return "HEALTHY";
  };

  // Compute condition class for animation
  const getConditionClass = (status, condition) => {
    if (status === "offline") return "offline";
    if (condition === "critical") return "critical";
    if (condition === "warning") return "warning";
    return "healthy";
  };

  const processedData = processBatteryData(data);
  const conditionText = getConditionText(processedData.status, processedData.condition);
  const conditionClass = getConditionClass(processedData.status, processedData.condition);

  return (
    <div className="card battery-card">
      <h2>Live Battery Status - {processedData.id}</h2>

      <div className="battery-stats">
        <ul>
          <li>State of Charge (SoC): <span>{processedData.soc}%</span></li>
          <li>State of Health (SoH): <span>{processedData.soh}%</span></li>
          <li>Voltage: <span>{processedData.voltage} V</span></li>
          <li>Current: <span>{processedData.current} A</span></li>
          <li>Temperature: <span>{processedData.temperature} °C</span></li>
          <li>Charge Cycles: <span>{processedData.cycles}</span></li>
        </ul>
      </div>

      <div className="health-section">
        <h3>AI-Predicted Health Score</h3>

        {/* Dynamic wave level controlled by CSS */}
        <div className={`health-circle ${conditionClass}`}>
          <div className="score">{processedData.healthScore}</div>
        </div>

        <p className="health-status">{conditionText}</p>
      </div>
    </div>
  );
}

export default BatteryCard;
