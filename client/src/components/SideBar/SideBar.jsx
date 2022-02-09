import React from "react";
import { Link } from "react-router-dom";
import "./css/sidebar.css";

function SideBar() {
  return (
    <>
      <div className="sidebar">
        <div className="logo-details">
          <span className="logo_name">DENTO</span>
        </div>
        <ul className="nav-links">
          <li>
            <Link to={"/"}>
              <i class="bx bx-grid-alt"></i>
              <span className="link_name">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to={"/"}>
              <i class="bx bx-line-chart"></i>
              <span className="link_name">Chart</span>
            </Link>
          </li>
          <li>
            <Link to={"/"}>
              <i class="bx bx-cog"></i>
              <span className="link_name">Setting</span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideBar;
