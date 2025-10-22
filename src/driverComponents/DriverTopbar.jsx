import React from "react";
import FleetLogo from "../images/FleetLogo.png";

function DriverTopbar({ busData }) {
  return (
    <div className="topbar">
      <div className="left topbar-left">
        <img src={FleetLogo} alt="FleetZero Logo" className="fleet-logo" />
        <div className="topbar-text">
          <h2>Battery Digital Twin</h2>
          <p>Real-time Battery Status & Alerts</p>
        </div>
      </div>

      <div className="right">
        <p>
          <strong>Bus:</strong> {busData.id}
        </p>
        <p
          className={
            busData.status === "active" ? "online" : "status-offline"
          }
        >
          {busData.status === "active" ? "Online" : "Maintenance"}
        </p>
        <p className="update">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}

export default DriverTopbar;
