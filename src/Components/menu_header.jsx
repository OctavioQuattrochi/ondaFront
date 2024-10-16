// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import '../Styles/menu_header.css'; // Asegúrate de que esta ruta sea correcta
import isologo from '../sources/isologo.png'; // Importa la imagen

function Header() {
  return (
    <header className="header">
      <Link to="/" className='logo'>
        <img src={isologo} alt="Onda Studio Logo" className='logo-image' /> {/* Imagen del logo */}
      </Link>
      <nav>
        <ul>
          <li><Link to="/team">Team</Link></li> {/* Enlace a la página de Team */}
          <li><Link to="/projects">Proyectos</Link></li> {/* Enlace a la página de Projects */}
          <li><Link to="/store">Tienda</Link></li> {/* Enlace a la página de Store */}
          <li><Link to="/customs">Personalizados</Link></li> {/* Enlace a la página de Customs */}
          <li><Link to="/login">Iniciar sesión</Link></li> {/* Enlace a la página de Login */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
