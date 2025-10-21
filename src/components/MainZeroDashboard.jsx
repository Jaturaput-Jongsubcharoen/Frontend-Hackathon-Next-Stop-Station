import React, { useEffect, useState } from "react";
import axios from "axios";
import BatteryCard from "./BatteryCard";
import SustainabilityPanel from "./SustainabilityPanel";
import BusSelector from "./BusSelector";
import FleetStatusOverview from "./FleetStatusOverview";

import FleetLogo from "../images/FleetLogo.png";

function MainZeroDashboard() {
  const [data, setData] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const [error, setError] = useState(null);

  // Fetch all fleet data
  const fetchBatteryData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BE_URL}/api/battery`, {
        withCredentials: true,
      });

      const result = response.data;
      setData(result);

      if (result.buses && result.buses.length > 0) {
        setSelectedBus(result.buses[0]);
      }

      console.log("Fetched fleet data:", result);
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
      <div className="error">
        <h2>Cannot load FleetZero data</h2>
        <p>{error}</p>
      </div>
    );

  if (!data)
    return (
      <div className="loading">
        <h2>Loading FleetZero Battery Digital Twin...</h2>
      </div>
    );

  return (
    <div className="dashboard">

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
            <strong>Active Buses:</strong>{" "}
            {data.buses.filter((bus) => bus.status === "active").length} / {data.buses.length}
          </p>
          <p className="online">System Online</p>
          <p className="update">
            Last updated: {new Date(data.timestamp).toLocaleTimeString()}
          </p>
        </div>
      </div>

      <div className="glass-panel">
      <BusSelector onBusSelect={setSelectedBus} />

      {data && <FleetStatusOverview fleet={data} />}

      </div>

      {selectedBus && (
        <div className="grid">
          <BatteryCard data={selectedBus} />
          <SustainabilityPanel data={selectedBus} fleet={data} />
        </div>
      )}
    </div>
  );
}

export default MainZeroDashboard;
