import React from 'react';
import { Link } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext';
import '../../Styles/Shared/menu_header.css'; 
import isologo from "../../sources/isologo.png";


function Header() {
  const { isLogged } = useAuth();

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
          {!isLogged ? (
            <li><Link to="/login">Iniciar sesión</Link></li>
          ) : (
            <>
            <li><Link to="/perfil">Perfil</Link></li>
            <li><Link to="/cart">🛒 Ver carrito</Link></li>
            </>
          )}
          
        </ul>
      </nav>
    </header>
  );
}

export default Header;
