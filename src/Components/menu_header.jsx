// src/components/Header.js
import React from 'react';
import '../Styles/menu_header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">Onda Studio</div>
      <nav>
        <ul>
          <li><a href="#">Team</a></li>
          <li><a href="#">Proyectos</a></li>
          <li><a href="#">Tienda</a></li>
          <li><a href="#">Personalizados</a></li>
          <li><a href="#">Martín</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;