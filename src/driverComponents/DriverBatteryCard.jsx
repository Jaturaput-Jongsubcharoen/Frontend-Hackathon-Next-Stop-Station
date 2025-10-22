import React from "react";
import "./DriverBatteryCard.css";

function DriverBatteryCard({ busData }) {
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

  const conditionText = getConditionText(busData.status, busData.condition);
  const conditionClass = getConditionClass(busData.status, busData.condition);

  return (
    <div className="card driver-battery-card">
      <h2>Battery Health Status</h2>
      <ul>
        <li>State of Charge (SoC): <span>{busData.soc}%</span></li>
        <li>State of Health (SoH): <span>{busData.soh}%</span></li>
        <li>Temperature: <span>{busData.temperature} °C</span></li>
      </ul>

      <div className="health-section">
        <h3>Condition</h3>

        {/* Animated wave circle just like main BatteryCard */}
        <div className={`health-circle ${conditionClass}`}>
          <div className="score">{busData.healthScore}</div>
        </div>

        <p className="health-status">{conditionText}</p>
      </div>

      <div className="alerts">
        <h3>AI Live Alerts</h3>
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
