import React from 'react';
import Sidebar from '../Shared/Sidebar';
import '../../Styles/SuperAdmin/PresupuestoDetalle.css';
import { useNavigate } from 'react-router-dom';

const PresupuestoDetalle = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <div className="detalle-container">
        <h2 className="detalle-titulo">Presupuesto a confirmar - Detalle</h2>

        <div className="detalle-contenido">
          <div className="detalle-info">
            <p>Producto personalizado Nº156 - Cliente 9: Pedro</p>
            <p><strong>Tamaño:</strong> 130 × 80 centímetros</p>
            <p><strong>Color:</strong> Azul - Rojo - Blanco</p>
            <p><strong>Especificaciones del cliente:</strong> -</p>
            <p><strong>Total de metros a utilizar:</strong></p>

            <label><strong>Costo:</strong> $ <input value="5000" readOnly /></label>
            <label><strong>Porcentaje de ganancia:</strong> <input value="75" readOnly /> %</label>
            <label><strong>Precio propuesto:</strong> $ <input value="8750" readOnly /></label>

            <button className="guardar-btn">Guardar</button>
          </div>

          <div className="detalle-imagen">
            <img src="/ruta/a/imagen.jpg" alt="Producto" />
          </div>
        </div>

        <div className="detalle-footer">
          <button onClick={() => navigate(-1)}>Atrás</button>
        </div>
      </div>
    </div>
  );
};

export default PresupuestoDetalle;
