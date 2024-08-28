// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import '../Styles/menu_header.css'; // Asegúrate de que esta ruta sea correcta

function Header() {
  return (
    <header className="header">
      <div className="logo">Onda Studio</div>
      <nav>
        <ul>
          <li><Link to="/">Team</Link></li> {/* Enlace a la página de Team */}
          <li><Link to="/projects">Proyectos</Link></li> {/* Enlace a la página de Projects */}
          <li><Link to="/store">Tienda</Link></li> {/* Enlace a la página de Store */}
          <li><Link to="/customs">Personalizados</Link></li> {/* Enlace a la página de Customs */}
          <li><Link to="/login">Martín</Link></li> {/* Enlace a la página de Login */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
