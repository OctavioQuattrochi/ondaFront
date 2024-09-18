import React from 'react';
import '../Styles/projects.css';

const Proyectos = () => {
    return (
      <div className="proyectos-page">
        <h1>NUESTROS PROYECTOS</h1>
        <div className="gallery">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="image-container" key={index}>
              <img src="https://via.placeholder.com/300" alt={`Proyecto ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Proyectos;
  