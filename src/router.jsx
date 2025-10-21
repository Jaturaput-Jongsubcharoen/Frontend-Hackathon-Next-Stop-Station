import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainZeroDashboard from "./components/MainZeroDashboard";

const BatteryDetail = () => <h2>Battery Detail Page (Coming Soon)</h2>;
const Analytics = () => <h2>Analytics Dashboard (Coming Soon)</h2>;
const Sustainability = () => <h2>Sustainability Report (Coming Soon)</h2>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainZeroDashboard />,
    children: [
      {
        index: true,
        element: (
          <h3 style={{ textAlign: "center" }}>
            Select a bus from the FleetZero Digital Twin Dashboard 🚌
          </h3>
        ),
      },
      { path: "battery/:busId", element: <BatteryDetail /> },
      { path: "analytics", element: <Analytics /> },
      { path: "sustainability", element: <Sustainability /> },
    ],
  },
]);

export default router;
