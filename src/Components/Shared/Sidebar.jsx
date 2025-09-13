import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  PackageOpen,
  Package,
  Hammer,
  FileText,
  Users,
  DollarSign,
  ClipboardList
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "../../Styles/Shared/Sidebar.css";

export default function Sidebar() {
  const { isLogged } = useAuth();
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  if (!isLogged) return null;

  // Solo "usuario" ve compras y presupuestos
  if (role === "usuario") {
    return (
      <>
        {!open && (
          <button
            className="sidebar-toggle-btn"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            style={{ color: "#a95ff7", background: "#222" }}
          >
            ☰
          </button>
        )}
        <div className={`sidebar ${open ? "open" : ""}`}>
          <button
            className="sidebar-close-btn"
            onClick={() => setOpen(false)}
            aria-label="Cerrar menú"
            style={{ color: "#a95ff7" }}
          >
            ×
          </button>
          <ul className="sidebar-menu" style={{ marginTop: "50px" }}>
            <li>
              <NavLink
                to="/mis-compras"
                className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
                onClick={() => setOpen(false)}
              >
                <PackageOpen size={18} style={{ marginRight: "8px", color: "#a95ff7" }} />
                Mis compras
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/mis-presupuestos"
                className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
                onClick={() => setOpen(false)}
              >
                <FileText size={18} style={{ marginRight: "8px", color: "#a95ff7" }} />
                Mis presupuestos
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

  // Empleado y superadmin: NO ven "Mis compras" ni "Mis presupuestos"
  const showUsuarios = role === "superadmin";

  return (
    <>
      {!open && (
        <button
          className="sidebar-toggle-btn"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
          style={{ color: "#a95ff7", background: "#222" }}
        >
          ☰
        </button>
      )}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <button
          className="sidebar-close-btn"
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
          style={{ color: "#a95ff7" }}
        >
          ×
        </button>
        <ul className="sidebar-menu" style={{ marginTop: "50px" }}>
          <li>
            <NavLink
              to="/stok-materia"
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <PackageOpen size={18} style={{ marginRight: "8px", color: "#a95ff7" }} />
              Stock de materia prima
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/stock-productos"
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <Package size={18} style={{ marginRight: "8px", color: "#a95ff7" }} />
              Stock de productos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/produccion"
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <Hammer size={18} style={{ marginRight: "8px", color: "#a95ff7" }} />
              Producción
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/presupuestos"
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <FileText size={18} style={{ marginRight: "8px", color: "#a95ff7" }} />
              Presupuestos
            </NavLink>
          </li>
          {showUsuarios && (
            <li>
              <NavLink
                to="/usuarios"
                className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
                onClick={() => setOpen(false)}
              >
                <Users size={18} style={{ marginRight: "8px", color: "#a95ff7" }} />
                Usuarios
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/ventas"
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <DollarSign size={18} style={{ marginRight: "8px", color: "#a95ff7" }} />
              Ventas
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/ordenes"
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <ClipboardList size={18} style={{ marginRight: "8px", color: "#a95ff7" }} />
              Órdenes
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
