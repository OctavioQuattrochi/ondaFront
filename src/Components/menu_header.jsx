import React from 'react';
import { Link } from 'react-router-dom'; 
import '../Styles/menu_header.css'; 
import isologo from '../sources/isologo.png';

function Header() {
  return (
    <header className="header">
      <Link to="/" className='logo'>
        <img src={isologo} alt="Onda Studio Logo" className='logo-image' /> 
      </Link>
      <nav>
        <ul>
          <li><Link to="/team">Team</Link></li> 
          <li><Link to="/projects">Proyectos</Link></li>
          <li><Link to="/store">Tienda</Link></li>
          <li><Link to="/customs">Personalizados</Link></li> 
          <li><Link to="/login">Iniciar sesión</Link></li> 
        </ul>
      </nav>
    </header>
  );
}

export default Header;
