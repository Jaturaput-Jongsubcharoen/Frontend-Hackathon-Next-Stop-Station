import React, { useEffect, useState } from "react";
import axios from "axios";
import BatteryCard from "./BatteryCard";
import SustainabilityPanel from "./SustainabilityPanel";
import BusSelector from "./BusSelector";
import FleetStatusOverview from "./FleetStatusOverview";
import Topbar from "./Topbar";
import BatteryPredictionPanel from "./BatteryPredictionPanel";
import MaintenanceModal from "./MaintenanceModal";

import FleetLogo from "../images/FleetLogo-BrowserTabIcon-black.png";

function MainZeroDashboard() {
  const [data, setData] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchBatteryData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BE_URL}/api/battery`, {
        withCredentials: true,
      });
      const result = response.data;
      setData(result);
      if (result.buses?.length > 0) setSelectedBus(result.buses[0]);
    } catch (err) {
      console.error("Error fetching data:", err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchBatteryData();
  }, []);

  if (error)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8fafc",
        }}
      >
        <img
          src={FleetLogo}
          alt="FleetZero Error"
          style={{
            width: "150px",
            height: "auto",
            animation: "fadePulse 2s ease-in-out infinite",
            filter: "brightness(0)",
          }}
        />
        <p
          style={{
            marginTop: "16px",
            fontSize: "16px",
            color: "#333",
            fontWeight: 600,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Cannot load FleetZero data. Please try again later.
        </p>
        <p
          style={{
            marginTop: "4px",
            fontSize: "14px",
            color: "#666",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {error}
        </p>
      </div>
    );

  if (!data)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8fafc",
        }}
      >
        <img
          src={FleetLogo}
          alt="FleetZero Loading"
          style={{
            width: "150px",
            height: "auto",
            animation: "fadePulse 2s ease-in-out infinite",
          }}
        />
        <p
          style={{
            marginTop: "16px",
            fontSize: "16px",
            color: "#333",
            fontWeight: 600,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Loading FleetZero Battery Digital Twin...
        </p>
      </div>
    );

  return (
    <div className="dashboard">
      <Topbar data={data} />

      <div className="dashboard-header">
        <h1 className="dashboard-title">FLEET OPERATOR DASHBOARD</h1>
      </div>

      <div className="glass-panel">
        <BusSelector onBusSelect={setSelectedBus} />
        {data && <FleetStatusOverview fleet={data} />}
      </div>

      {selectedBus && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <BatteryCard data={selectedBus} />
            <SustainabilityPanel data={selectedBus} fleet={data} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1">
            <BatteryPredictionPanel
              data={selectedBus}
              onOpenModal={() => setModalOpen(true)}
            />
          </div>

          <MaintenanceModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            busData={selectedBus}
          />
        </>
      )}
    </div>
  );
}

export default MainZeroDashboard;
