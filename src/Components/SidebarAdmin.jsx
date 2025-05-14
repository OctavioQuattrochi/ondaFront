import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Sidebar.css";

export default function SidebarAdmin() {
  return (
    <div className="sidebar">
      <div className="logo">Onda estudio</div>
      <input type="text" className="search-input" placeholder="Buscar sección" />
      <ul className="sidebar-menu">
        <li><Link to="/stok-materia">Stock de materia prima</Link></li>
        <li><Link to="/stock-productos">Stock de productos</Link></li>
        <li><Link to="/produccion">Producción</Link></li>
      </ul>
    </div>
  );
}
