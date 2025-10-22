import React from "react";

function DriverBatteryCard({ busData }) {
  const getConditionStyle = (status, condition) => {
    if (status === "offline")
      return { text: "MAINTENANCE", color: "#9E9E9E" }; 
    if (condition === "critical")
      return { text: "CRITICAL", color: "#E53935" };
    if (condition === "warning")
      return { text: "WARNING", color: "#FFC107" }; 
    return { text: "HEALTHY", color: "#4CAF50" };
  };

  const condition = getConditionStyle(busData.status, busData.condition);

  return (
    <div className="card battery-card">
      <h2>Battery Health Status</h2>
      <ul>
        <li>State of Charge (SoC): <span>{busData.soc}%</span></li>
        <li>State of Health (SoH): <span>{busData.soh}%</span></li>
        <li>Voltage: <span>{busData.voltage} V</span></li>
        <li>Temperature: <span>{busData.temperature} °C</span></li>
      </ul>

      <div className="health-section">
        <h3>Condition</h3>
        <div
          className="health-circle"
          style={{ borderColor: condition.color }}
        >
          <div className="score" style={{ color: condition.color }}>
            {busData.healthScore}
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

      <div className="alerts">
        <h3>Live Alerts</h3>
        <div className="alert warning">
          <strong>Battery Alert:</strong> {busData.predictiveAlert}
        </div>
        <div className="alert info">
          <strong>Optimization Tip:</strong> {busData.optimization}
        </div>
      </div>
    </div>
  );
}

export default DriverBatteryCard;
