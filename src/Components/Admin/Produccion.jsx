import React from 'react';
import Sidebar from '../Shared/Sidebar';
import '../../Styles/Admin/Produccion.css';


const Produccion = () => {
  return (
    <div className="produccion-layout">
      <Sidebar />
      <div className="produccion-container">
        <h1 className="produccion-titulo">Producción</h1>

        <div className="filtro-estado">
          <label htmlFor="estado">Estado:</label>
          <select id="estado" disabled>
            <option>Pendiente</option>
          </select>
        </div>

        <div className="tabla-wrapper">
          <table className="tabla-produccion">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Cantidad</th>
                <th>Fecha estado</th>
                <th>Ubicación</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Onda bb</td>
                <td>Rojo</td>
                <td>Pendiente</td>
                <td>05</td>
                <td>01/04/23</td>
                <td>Martín</td>
              </tr>
              <tr>
                <td>Onda sunset</td>
                <td>Azul</td>
                <td>Pendiente</td>
                <td>00</td>
                <td>12/04/23</td>
                <td>Martín</td>
              </tr>
              <tr>
                <td>Personalizado</td>
                <td>Cliente 8</td>
                <td>Pendiente</td>
                <td>07</td>
                <td>02/04/23</td>
                <td>Martín</td>
              </tr>
              <tr>
                <td>Onda bb</td>
                <td>Azul</td>
                <td>En producción</td>
                <td>00</td>
                <td>12/04/23</td>
                <td>Martín</td>
              </tr>
              <tr>
                <td>Personalizado</td>
                <td>Cliente 2</td>
                <td>Finalizado</td>
                <td>08</td>
                <td>06/04/23</td>
                <td>Martín</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="formulario-edicion">
          <div className="campo">
            <label>Producto:</label>
            <input type="text" value="Onda sunset" disabled />
          </div>
          <div className="campo">
            <label>Cantidad:</label>
            <select disabled>
              <option>1</option>
            </select>
          </div>
          <div className="campo">
            <label>Estado:</label>
            <select disabled>
              <option>Finalizado</option>
            </select>
          </div>

          <div className="botones">
            <button className="ver-detalle">Ver detalle</button>
            <div>
              <button className="btn aceptar">Aceptar</button>
              <button className="btn cancelar">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produccion;
