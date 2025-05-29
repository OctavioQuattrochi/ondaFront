import React from 'react';
import Sidebar from '../Shared/Sidebar';
import '../../Styles/Admin/StockMateriaPrima.css';


const StockMateriaPrima = () => {
  return (
    <div className="stock-layout">
      <Sidebar />
      <div className="stock-container">
        <h1 className="stock-titulo">Stock de materia prima</h1>

        <div className="filtros">
          <div className="campo">
            <label>Material</label>
            <input type="text" value="Neon" disabled />
          </div>
          <div className="campo">
            <label>Ubicación</label>
            <select disabled>
              <option>Santiago</option>
            </select>
          </div>
          <button className="buscar-btn" disabled>
            🔍
          </button>
        </div>

        <table className="tabla-stock">
          <thead>
            <tr>
              <th>Material</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Cantidad</th>
              <th>Tipo de medida</th>
              <th>Ubicación</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tira Neon</td>
              <td>Rojo</td>
              <td>En stock</td>
              <td>05</td>
              <td>Rollo</td>
              <td>Santiago</td>
            </tr>
            <tr>
              <td>Tira Neon</td>
              <td>Azul</td>
              <td>Sin Stock</td>
              <td>00</td>
              <td>Rollo</td>
              <td>Santiago</td>
            </tr>
            <tr>
              <td>Tira Neon</td>
              <td>Verde</td>
              <td>Encargado</td>
              <td>07</td>
              <td>Rollo</td>
              <td>Francisco</td>
            </tr>
            <tr>
              <td>Tira Neon</td>
              <td>Azul</td>
              <td>Sin Stock</td>
              <td>00</td>
              <td>Rollo</td>
              <td>Sofía</td>
            </tr>
            <tr>
              <td>Fuente</td>
              <td>--</td>
              <td>En stock</td>
              <td>08</td>
              <td>Unidades</td>
              <td>Francisco</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockMateriaPrima;
