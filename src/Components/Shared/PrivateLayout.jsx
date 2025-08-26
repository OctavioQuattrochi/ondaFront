import React from "react";
import Sidebar from "./Sidebar";

export default function PrivateLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "80vh" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}