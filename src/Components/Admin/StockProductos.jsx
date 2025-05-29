import React from 'react';
import Sidebar from '../Shared/Sidebar';
import '../../Styles/Admin/StockProductos.css';

const StockProductos = () => {
  return (
    <div className="stock-productos-layout">
      <Sidebar />
      <div className="stock-productos-container">
        <h1 className="titulo">Stock de productos</h1>

        <div className="filtros">
          <label>Producto:</label>
          <select disabled>
            <option>Onda bb</option>
          </select>
        </div>

        <div className="tabla-container">
          <table className="tabla">
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
                <td>Onda bb</td>
                <td>Rojo</td>
                <td>En stock</td>
                <td>05</td>
                <td>Unidad</td>
                <td>Martín</td>
              </tr>
              <tr>
                <td>Onda sunset</td>
                <td>Azul</td>
                <td>Sin Stock</td>
                <td>00</td>
                <td>Unidad</td>
                <td>Martín</td>
              </tr>
              <tr>
                <td>Onda astros</td>
                <td>Mercurio</td>
                <td>En fabricación</td>
                <td>07</td>
                <td>Unidad</td>
                <td>Martín</td>
              </tr>
              <tr>
                <td>Onda bb</td>
                <td>Azul</td>
                <td>Sin Stock</td>
                <td>00</td>
                <td>Unidad</td>
                <td>Martín</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockProductos;
