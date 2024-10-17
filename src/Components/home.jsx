import React from 'react';
import '../Styles/home.css';
import { Link } from 'react-router-dom';
import video from '../sources/home/Inicio.mp4';
import gif from '../sources/home/Gif.mp4';


const Home = () => {
  return (
    <div>
      <div className="contenedor">

        <video autoPlay muted loop className="video-background">
          <source src={video} type="video/mp4" />
          Tu navegador no soporta el video.
        </video>

        <div className="content-bienvenidos">
          <h1>Bienvenidos onderos<br /> a nuestro espacio</h1>
          <Link to="/projects" className="btn-diseño">Ver diseños</Link>
        </div>
      </div>

      {/* Franja de seguridad */}
      <div className="security-strip">
        <div className="container left">
          <i className="fa-solid fa-truck-fast"></i>
          <p>Envío gratis<br />a todo el país</p>
        </div>
        <div className="container middle">
          <i className="fa-solid fa-money-bill-1-wave"></i>
          <p>10% OFF<br />Efectivo / Transferencia</p>
        </div>
        <div className="container right">
          <i className="fa-regular fa-credit-card"></i>
          <p>3 Cuotas<br />Sin interés</p>
        </div>
      </div>


      {/* Nuevo contenedor con GIF y texto */}
      <div className="info-container">

        <div className="info-left">
          <video autoPlay muted loop className="info-gif">
            <source src={gif} type="video/mp4" />
            Tu navegador no soporta el video.
          </video>

        </div>
        <div className="info-right">
          <h1 className="info-title">Queremos que sepas<br />que tenemos onda<br />con vos</h1>
          <p className="info-text">Y queremos transformar tu espacio para que la experiencia de<br />
            trabajar, o estudiar, relajarte, juntarte con amigos o<br />
            simplemente vivir tenga más onda.</p>
        </div>
      </div>

      {/* Somos fans del cielo */}
      <div class="contenedor-fondo">
        <h1>Y que somos dnas del cielo</h1>
        <h1>y de sus atardeceres.</h1>
        <p>Encontramos inspiración en la luz, en el sol, en los<br />
          colores. Fabricamos imitaciones imperfectas de las<br />
          experiencias que nos regala el alba.
        </p>
      </div>

    </div>
  );
};

export default Home;
