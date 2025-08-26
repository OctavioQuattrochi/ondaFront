import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  PackageOpen,
  Package,
  Hammer,
  FileText
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "../../Styles/Shared/Sidebar.css";

export default function Sidebar() {
  const { isLogged } = useAuth();
  const [open, setOpen] = useState(false);

  if (!isLogged) return null;

  return (
    <>
      {/* Botón flotante para abrir el sidebar SOLO si está cerrado */}
      {!open && (
        <button
          className="sidebar-toggle-btn"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
        >
          ☰
        </button>
      )}
      {/* Sidebar desplegable */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        {/* Botón para cerrar el sidebar */}
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
        </ul>
      </div>
      {/* Fondo oscuro al abrir */}
      {open && (
        <div
          className="sidebar-backdrop"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
