import React from 'react';
import '../Styles/customs.css';

const Customs = () => {
  return (
    <div className="budget-page">
      <div className="header-container">
        <h1 className="budget-title">PRESUPUESTO</h1>
      </div>
      <div className="content-container">
        <div className="left-container">
          <label htmlFor="imageUpload" className="upload-label">
            <div className="upload-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                width="48"
                viewBox="0 0 48 48"
                fill="#888"
              >
                <path d="M22.5 31.5h3v-9.85l3.65 3.6 2.1-2.1-7.3-7.3-7.3 7.3 2.1 2.1 3.65-3.6ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Z"/>
              </svg>
            </div>
          </label>
          <input type="file" id="imageUpload" className="image-input" />
        </div>

        <div className="right-container">
          <h2 className="subtitle">Personaliza el tuyo</h2>

          <div className="input-group">
            <label htmlFor="height">Tamaño</label>
            <div className="input-size">
              <input
                type="number"
                id="height"
                placeholder="Alto"
                className="numeric-input"
                min="1"
                defaultValue="50"
              />
              <span className="unit">cm</span>
            </div>
            <div className="input-size">
              <input
                type="number"
                id="width"
                placeholder="Ancho"
                className="numeric-input"
                min="1"
                defaultValue="80"
              />
              <span className="unit">cm</span>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="color">Color</label>
            <select id="color" className="color-select">
              <option value="warm-white">Blanco cálido</option>
              <option value="cool-white">Blanco frío</option>
              <option value="red">Rojo</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="quantity">Cantidad</label>
            <input
              type="number"
              id="quantity"
              className="numeric-input"
              min="1"
              defaultValue="1"
            />
          </div>

          <div className="input-group">
            <label htmlFor="note">Nota</label>
            <textarea
              id="note"
              className="note-textarea"
              placeholder="Especificaciones. Ej: si es más de un color"
              rows="4"
            />
          </div>

          <button className="budget-button">Presupuestar</button>
        </div>
      </div>
    </div>
  );
};

export default Customs;
