import React from "react";

function FleetStatusOverview({ fleet }) {
  if (!fleet || !fleet.buses) return null;

  let healthyCount = 0;
  let warningCount = 0;
  let criticalCount = 0;
  let offlineCount = 0;

  fleet.buses.forEach((bus) => {
    if (bus.status === "offline") {
      offlineCount++;
    } else if (bus.condition === "critical") {
      criticalCount++;
    } else if (bus.condition === "warning") {
      warningCount++;
    } else {
      healthyCount++;
    }
  });

  const total = fleet.buses.length || 1;
  const healthyPercent = Math.round((healthyCount / total) * 100);
  const warningPercent = Math.round((warningCount / total) * 100);
  const criticalPercent = Math.round((criticalCount / total) * 100);
  const offlinePercent = Math.round((offlineCount / total) * 100);

  let fleetStatus = "Overall Good";
  let fleetClass = "status-good";

  if (criticalPercent > 5) {
    fleetStatus = "Critical Alert";
    fleetClass = "status-critical";
  } else if (warningPercent > 10) {
    fleetStatus = "Warning";
    fleetClass = "status-warning";
  } else if (offlinePercent > 20) {
    fleetStatus = "Maintenance Mode";
    fleetClass = "status-offline";
  }

  return (
    <div className="fleet-status">
      <h3>Overall Fleet Status</h3>
      <p>
        Healthy: {healthyPercent}% | Warning: {warningPercent}% | Critical:{" "}
        {criticalPercent}% | Offline: {offlinePercent}%
      </p>
      <p className={fleetClass}>{fleetStatus.toUpperCase()}</p>
    </div>
  );
}

export default FleetStatusOverview;
