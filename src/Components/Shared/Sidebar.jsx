import React from "react";
import { Link } from "react-router-dom";
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
      <input type="text" className="search-input" placeholder="Ingrese su busqueda" />
      <ul className="sidebar-menu">
        <li>
          <Link to="/mis-compras" className="sidebar-link">
            <PackageOpen size={18} style={{ marginRight: "8px" }} />
            Mis compras
          </Link>
        </li>
        <li>
          <Link to="/mis-presupuestos" className="sidebar-link">
            <FileText size={18} style={{ marginRight: "8px" }} />
            Mis presupuestos
          </Link>
        </li>
        ---
        <li>
          <Link to="/stok-materia" className="sidebar-link">
            <PackageOpen size={18} style={{ marginRight: "8px" }} />
            Stock de materia prima
          </Link>
        </li>
        <li>
          <Link to="/stock-productos" className="sidebar-link">
            <Package size={18} style={{ marginRight: "8px" }} />
            Stock de productos
          </Link>
        </li>
        <li>
          <Link to="/produccion" className="sidebar-link">
            <Hammer size={18} style={{ marginRight: "8px" }} />
            Producción
          </Link>
        </li>
        ---
        <li>
          <Link to="/presupuestos" className="sidebar-link">
            <FileText size={18} style={{ marginRight: "8px" }} />
            Presupuesto a Confirmar
          </Link>
        </li>
      </ul>
    </div>
  );
}
