import React, { useEffect, useState } from "react";
import axios from "axios";
import BatteryCard from "./BatteryCard";
import SustainabilityPanel from "./SustainabilityPanel";
import BusSelector from "./BusSelector";
import FleetStatusOverview from "./FleetStatusOverview";
import Topbar from "./Topbar";
import BatteryPredictionPanel from "./BatteryPredictionPanel";

function MainZeroDashboard() {
  const [data, setData] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const [error, setError] = useState(null);

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start auto-rows-min">
            <BatteryCard data={selectedBus} />
            <SustainabilityPanel data={selectedBus} fleet={data} />
          </div>

          <div>
            <BatteryPredictionPanel data={selectedBus} />
          </div>
        </>
      )}
    </div>
  );
}

export default MainZeroDashboard;
