import React from "react";

function BatteryCard({ data }) {
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

  const getConditionStyle = (status, condition) => {
    if (status === "offline") return { text: "MAINTENANCE", color: "#9E9E9E" };
    if (condition === "critical") return { text: "CRITICAL", color: "#E53935" };
    if (condition === "warning") return { text: "WARNING", color: "#FFC107" };
    return { text: "HEALTHY", color: "#4CAF50" };
  };

  const processedData = processBatteryData(data);
  const condition = getConditionStyle(processedData.status, processedData.condition);

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
        <h3>Health Score</h3>
        <div className="health-circle" style={{ borderColor: condition.color }}>
          <div className="score" style={{ color: condition.color }}>
            {processedData.healthScore}
          </div>
        </div>

        <p
          className="bus-condition"
          style={{
            color: condition.color,
            fontWeight: 600,
            fontSize: "1.1rem",
            marginTop: "6px",
          }}
        >
          {condition.text}
        </p>
      </div>
    </div>
  );
}

export default BatteryCard;
