import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  PackageOpen, 
  Package, 
  Hammer, 
  DollarSign, 
  BarChart2, 
  FileText, 
  Users, 
  UserCheck 
} from 'lucide-react';
import '../../Styles/SuperAdmin/SidebarSuperAdmin.css';

const SidebarSuperAdmin = () => {
  return (
    <div className="sidebar">
      <div className="logo">Onda<br />estudio ✨</div>
      <input type="text" placeholder="Search instances" className="search-input" />

      <nav className="nav">
        <NavLink to="/stock-materia-prima">
          <PackageOpen size={18} />
          <span>Stock<br /><small>de materia prima</small></span>
        </NavLink>

        <NavLink to="/stock-productos">
          <Package size={18} />
          <span>Stock<br /><small>de productos</small></span>
        </NavLink>

        <NavLink to="/produccion">
          <Hammer size={18} />
          <span>Producción</span>
        </NavLink>

        <NavLink to="/flujo-caja">
          <DollarSign size={18} />
          <span>Flujo de caja</span>
        </NavLink>

        <NavLink to="/graficos-ventas">
          <BarChart2 size={18} />
          <span>Gráficos<br /><small>de ventas</small></span>
        </NavLink>

        <NavLink to="/presupuestos">
          <FileText size={18} />
          <span>Presupuestos<br /><small>a confirmar</small></span>
        </NavLink>

        <NavLink to="/clientes">
          <Users size={18} />
          <span>Clientes</span>
        </NavLink>

        <NavLink to="/empleados">
          <UserCheck size={18} />
          <span>Empleados</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default SidebarSuperAdmin;
