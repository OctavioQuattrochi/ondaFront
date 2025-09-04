import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  PackageOpen,
  Package,
  Hammer,
  FileText,
  Users,
  DollarSign
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "../../Styles/Shared/Sidebar.css";

export default function Sidebar() {
  const { isLogged } = useAuth();
  const [open, setOpen] = useState(false);

  if (!isLogged) return null;

  return (
    <>
      {!open && (
        <button
          className="sidebar-toggle-btn"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
        >
          ☰
        </button>
      )}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <button
          className="sidebar-close-btn"
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
        >
          ×
        </button>
        <input type="text" className="search-input" placeholder="Ingrese su búsqueda" />
        <ul className="sidebar-menu">
          <li>
            <NavLink
              to="/mis-compras"
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <PackageOpen size={18} style={{ marginRight: "8px" }} />
              Mis compras
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mis-presupuestos"
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <FileText size={18} style={{ marginRight: "8px" }} />
              Mis presupuestos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/stok-materia"
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <PackageOpen size={18} style={{ marginRight: "8px" }} />
              Stock de materia prima
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/stock-productos"
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <Package size={18} style={{ marginRight: "8px" }} />
              Stock de productos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/produccion"
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <Hammer size={18} style={{ marginRight: "8px" }} />
              Producción
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/presupuestos"
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <FileText size={18} style={{ marginRight: "8px" }} />
              Presupuesto a Confirmar
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/usuarios"
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <Users size={18} style={{ marginRight: "8px" }} />
              Usuarios
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ventas"
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <DollarSign size={18} style={{ marginRight: "8px" }} />
              Ventas
            </NavLink>
          </li>
        </ul>
      </div>
      {open && (
        <div
          className="sidebar-backdrop"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
