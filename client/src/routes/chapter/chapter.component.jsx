import React from "react";
import { Outlet } from "react-router-dom";
import "./chapter.styles.scss";

export default function Chapter() {
  return (
    <div className="chapter-container">
      <Outlet />
    </div>
  );
}
