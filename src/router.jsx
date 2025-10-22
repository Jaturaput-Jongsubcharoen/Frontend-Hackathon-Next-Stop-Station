import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainZeroDashboard from "./components/MainZeroDashboard";
import DriverMonitorDashboard from "./driverComponents/DriverMonitorDashboard";

const router = createBrowserRouter([
  // Fleet Operator Dashboard (main)
  {path: "/", element: <MainZeroDashboard />,},

  // Driver Monitoring Dashboard
  {path: "/driver-monitor", element: <DriverMonitorDashboard />,},
]);

export default router;
