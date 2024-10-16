import React from 'react';
import '../Styles/customs.css';

const Customs = () => {
  return (
    <div className="budget-page">
      <div className="header-container">
        <h1 className="budget-title">Presupuesto</h1>
      </div>
      <div className="content-container">
        <div className="left-container">
          <label htmlFor="imageUpload">Cargar Imagen</label>
          <input type="file" id="imageUpload" className="image-input" />
        </div>
        <div className="right-container">
          <h2 className="subtitle">Personaliza el tuyo</h2>

          <div className="input-group">
            <label htmlFor="height">Tamaño</label>
            <div className="input-size">
              <input type="number" id="height" placeholder="Alto" className="numeric-input" min="1" defaultValue="1" />
              <span className="unit">Cm</span>
            </div>
            <div className="input-size">
              <input type="number" id="width" placeholder="Ancho" className="numeric-input" min="1" defaultValue="1" />
              <span className="unit">Cm</span>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="color">Color</label>
            <select id="color" className="color-select">
              <option value="red">Rojo</option>
              <option value="yellow">Amarillo</option>
              <option value="white">Blanco</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="quantity">Cantidad</label>
            <input type="number" id="quantity" className="numeric-input" min="1" defaultValue="1" />
          </div>

          <div className="input-group">
            <label htmlFor="note">Nota</label>
            <textarea id="note" className="note-textarea" rows="4" />
          </div>

          <button className="budget-button">Presupuestar</button>
        </div>
      </div>
    </div>
  );
}

export default Customs;
