import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <input type="text" className="search-input" placeholder="Ingrese su busueda" />
      <ul className="sidebar-menu">
        <li>
          <Link to="/mis-compras" className="sidebar-link">Mis compras</Link>
        </li>
        <li>
          <Link to="/mis-presupuestos">Mis presupuestos</Link>
        </li>
      </ul>
    </div>
  );
}
