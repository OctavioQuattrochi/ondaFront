import React from 'react';
import Sidebar from '../Shared/Sidebar';
import '../../Styles/SuperAdmin/Presupuestos.css';
import { useNavigate } from 'react-router-dom';

const datos = [
  { cliente: 'Pedro', costo: '$1000', ganancia: '$1000', precio: '$2000', detalle: 'Color Rojo' },
  { cliente: 'Pedro', costo: '$1500', ganancia: '$1000', precio: '$2500', detalle: 'Color Rojo' },
  { cliente: 'Pedro', costo: '$2000', ganancia: '$1000', precio: '$3000', detalle: 'Color Rojo' },
];

const Presupuestos = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      
      <div className="presupuestos-container">
        <h2 className="titulo">Presupuestos a confirmar</h2>

        <div className="tabla-container">
          <table className="tabla">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Costo</th>
                <th>Ganancia</th>
                <th>Precio propuesto</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((fila, i) => (
                <tr key={i}>
                  <td>{fila.cliente}</td>
                  <td>{fila.costo}</td>
                  <td>{fila.ganancia}</td>
                  <td>{fila.precio}</td>
                  <td>
                    <button 
                      className="ver-detalle-btn"
                      onClick={() => navigate('/detalle-presupuesto')}
                    >
                      Ver detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Presupuestos;
