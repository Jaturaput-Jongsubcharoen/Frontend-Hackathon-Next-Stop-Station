import React from "react";

function BatteryCard({ data }) {
  return (
    <div className="card battery-card">
      <h2>Live Battery Status - {data.busId}</h2>
      <div className="battery-stats">
        <ul>
          <li>State of Charge (SoC): <span>{data.soc}%</span></li>
          <li>State of Health (SoH): <span>{data.soh}%</span></li>
          <li>Voltage: <span>{data.voltage} V</span></li>
          <li>Current: <span>{data.current} A</span></li>
          <li>Temperature: <span>{data.temperature} °C</span></li>
          <li>Charge Cycles: <span>{data.cycles}</span></li>
        </ul>
      </div>

      <div className="health-section">
        <h3>Health Score</h3>
        <div className="health-circle">
          <div className="score">{data.healthScore}</div>
        </div>
        <p className="health-status">
          {data.healthScore >= 90
            ? "GOOD"
            : data.healthScore >= 75
            ? "FAIR"
            : "NEEDS ATTENTION"}
        </p>
      </div>

      <div className="alerts">
        <h3>AI Predictions & Alerts</h3>
        <div className="alert warning">
          <strong>Battery Degradation Detected:</strong> {data.predictiveAlert}
        </div>
        <div className="alert info">
          <strong>Optimization:</strong> {data.optimization}
        </div>
        <div className="alert insight">
          <strong>Insight:</strong> Estimated failure risk: {data.estimatedFailureRisk}
        </div>
        <button className="schedule-btn">Schedule Maintenance Now</button>
      </div>
    </div>
  );
}

export default BatteryCard;
