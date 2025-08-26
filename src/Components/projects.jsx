import React from 'react';
import '../Styles/projects.css';

const images = [
  "caras.jpeg",
  "galleta.jpeg",
  "malabia.jpeg",
  "personas.jpeg",
  "public.jpeg",
  "skincare.jpeg"
];

const Proyectos = () => {
  return (
    <div className="proyectos-page">
      <h1>NUESTROS PROYECTOS</h1>
      <div className="gallery">
        {images.map((img, index) => (
          <div className="image-container" key={index}>
            <img src={`/src/sources/projects/${img}`} alt={`Proyecto ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Proyectos;
