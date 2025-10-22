import React, { useState } from "react";
import BatteryPerformanceChart from "./BatteryPerformanceChart";
import MaintenanceModal from "./MaintenanceModal";

function BatteryPredictionPanel({ data }) {
  const [isModalOpen, setModalOpen] = useState(false);

  if (!data) return null;

  return (
    <div className="card battery-prediction-panel mt-6">
      <h3 className="text-xl font-semibold mb-3 text-indigo-700">
        AI Predictions & Alerts
      </h3>

      <div className="alert warning">
        <strong>Battery Degradation Detected:</strong> {data.predictiveAlert}
      </div>
      <div className="alert info">
        <strong>Optimization:</strong> {data.optimization}
      </div>
      <div className="alert insight">
        <strong>Insight:</strong> Estimated failure risk: {data.estimatedFailureRisk} ({data.riskLevel})
      </div>

      <div className="battery-chart-section mt-4">
        <BatteryPerformanceChart bus={data} />
      </div>

      <div className="mt-4 text-center">
        <button className="schedule-btn" onClick={() => setModalOpen(true)}>
          Schedule Maintenance Now
        </button>
      </div>

      <MaintenanceModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        busData={data}
      />
    </div>
  );
}

export default BatteryPredictionPanel;
