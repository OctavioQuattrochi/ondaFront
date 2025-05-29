import React from "react";
import { NavLink } from "react-router-dom";
import {
  PackageOpen,
  Package,
  Hammer,
  FileText
} from "lucide-react";
import "../../Styles/Shared/Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <input type="text" className="search-input" placeholder="Ingrese su búsqueda" />
      <ul className="sidebar-menu">
        <li>
          <NavLink
            to="/mis-compras"
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <PackageOpen size={18} style={{ marginRight: "8px" }} />
            Mis compras
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/mis-presupuestos"
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <FileText size={18} style={{ marginRight: "8px" }} />
            Mis presupuestos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/stok-materia"
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <PackageOpen size={18} style={{ marginRight: "8px" }} />
            Stock de materia prima
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/stock-productos"
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <Package size={18} style={{ marginRight: "8px" }} />
            Stock de productos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/produccion"
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <Hammer size={18} style={{ marginRight: "8px" }} />
            Producción
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/presupuestos"
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
          >
            <FileText size={18} style={{ marginRight: "8px" }} />
            Presupuesto a Confirmar
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
