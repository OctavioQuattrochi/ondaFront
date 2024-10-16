import React from 'react';
import '../Styles/home.css';
import { Link } from 'react-router-dom';
import video from '../sources/home/Inicio.mp4'; 
import gif from '../sources/home/Gif.mp4'; 

const Home = () => {
  return (
    <div>
      <div className="video-container">
        <video autoPlay muted loop className="video-background">
          <source src={video} type="video/mp4" />
          Tu navegador no soporta el video.
        </video>
        <div className="content-bienvenidos">
          <h1>Bienvenidos onderos<br /> a nuestro espacio</h1>
          <Link to="/projects" className="btn">Ver diseños</Link>
        </div>
      </div>

      {/* Franja de seguridad */}
      <div className="security-strip">
        <div className="container left">
          <p>Envío gratis<br />a todo el país</p>
        </div>
        <div className="container middle">
          <p>10% OFF<br />Efectivo / Transferencia</p>
        </div>
        <div className="container right">
          <p>3 Cuotas<br />Sin interés</p>
        </div>
      </div>

      {/* Nuevo contenedor con GIF y texto */}
      <div className="info-container">
        <div className="info-left">
          <img src={gif} alt="Gif ilustrativo" className="info-gif" />
        </div>
        <div className="info-right">
          <h2 className="info-title">Queremos que sepas<br />que tenemos onda<br />con vos</h2>
          <p className="info-text">Y queremos transformar tu espacio para que la experiencia de<br />
            trabajar, o estudiar, relajarte, juntarte con amigos o<br />
            simplemente vivir tenga más onda.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
