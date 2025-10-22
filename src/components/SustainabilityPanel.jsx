import React from "react";

function SustainabilityPanel({ data }) {
  if (!data) return null;

  return (
    <div className="card sustainability-card">
      <h2>Sustainability Impact</h2>
      <ul>
        <li>
          CO₂ Saved This Month: <strong>{data.co2Saved} tons</strong>
        </li>
        <li>
          Battery Life Extended: <strong>+{data.batteryLifeExtended}%</strong>
        </li>
        <li>
          Fleet Carbon Efficiency: <strong>92% electric uptime</strong>
        </li>
      </ul>

      <div className="realtime glass-panel">
        <h3>Real-time Sensor Data</h3>
        <p>
          Cell Voltage Range: {data.voltage - 0.5}–{data.voltage + 0.5} V
        </p>
        <p>Max Cell Temp: {data.maxCellTemp} °C</p>
        <p>Internal Resistance: {data.internalResistance} mΩ</p>
        <p>Remaining Range: {data.remainingRange} km</p>
      </div>
    </div>
  );
}

export default SustainabilityPanel;
