import React from "react";
import FleetLogo from "../images/FleetLogo.png";

function Topbar({ data }) {
  if (!data) return null;

  const activeCount = data.buses.filter((bus) => bus.status === "active").length;
  const totalCount = data.buses.length;

  return (
    <div className="topbar">
      <div className="left topbar-left">
        <img src={FleetLogo} alt="FleetZero Logo" className="fleet-logo" />
        <div className="topbar-text">
          <h2>Battery Digital Twin</h2>
          <p>Real-time Predictive Maintenance System</p>
        </div>
      </div>

      <div className="right">
        <p>
          <strong>Active Buses:</strong> {activeCount} / {totalCount}
        </p>
        <p className="online">System Online</p>
        <p className="update">
          Last updated: {new Date(data.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}

export default Topbar;
