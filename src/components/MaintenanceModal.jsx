import React from "react";
import "../App.css";

function MaintenanceModal({ isOpen, onClose, busData }) {
  if (!isOpen || !busData) return null;

  // Use same style logic as BatteryCard for consistency
  const getConditionStyle = (status, condition) => {
    if (status === "offline") return { text: "MAINTENANCE", color: "#9E9E9E" };
    if (condition === "critical") return { text: "CRITICAL", color: "#E53935" };
    if (condition === "warning") return { text: "WARNING", color: "#FFC107" };
    return { text: "HEALTHY", color: "#4CAF50" };
  };

  const condition = getConditionStyle(busData.status, busData.condition);

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        <h2>Schedule Maintenance</h2>

        <p>
          You are scheduling maintenance for <strong>{busData.id}</strong>.
        </p>

        <p>
          <strong>Current Condition:</strong>{" "}
          <span style={{ color: condition.color, fontWeight: 600 }}>
            {condition.text}
          </span>
        </p>

        <p>
          <strong>Battery Health:</strong> {busData.soh}% |{" "}
          <strong>Charge:</strong> {busData.soc}%
        </p>

        <p
          style={{
            marginTop: "1rem",
            color:
              busData.estimatedFailureRisk.includes("High") ||
              busData.estimatedFailureRisk.includes("Critical")
                ? "#E53935"
                : busData.estimatedFailureRisk.includes("Medium")
                ? "#FFB300"
                : "#4CAF50",
            fontWeight: 600,
          }}
        >
          Based on predictive analytics, estimated failure risk is{" "}
          <strong>{busData.estimatedFailureRisk}</strong>.
        </p>

        <div className="modal-actions">
          <button
            className="confirm-btn"
            onClick={() =>
              alert(
                `Maintenance scheduled for ${busData.id} (${busData.condition.toUpperCase()})`
              )
            }
          >
            Confirm
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default MaintenanceModal;
