import React, { useEffect, useState } from 'react';
import Sidebar from '../Shared/Sidebar';
import '../../Styles/Admin/StockProductos.css';
import AuthService from "../../Service/AuthService";

const PRODUCT_OPTIONS = ["Onda bb", "Onda Sunset", "Onda Astros"];

const StockProductos = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");
  const [productoFilter, setProductoFilter] = useState("");

  useEffect(() => {
    AuthService.getPredefinedProducts()
      .then(data => setProductos(data))
      .catch(() => setError("No se pudieron cargar los productos."));
  }, []);

  const filteredProductos = productos.filter(prod =>
    productoFilter
      ? prod.name?.toLowerCase() === productoFilter.toLowerCase()
      : true
  );

  return (
    <div className="stock-productos-layout">
      <Sidebar />
      <div className="stock-productos-container">
        <h1 className="titulo">Stock de productos</h1>

        <div className="filtros">
          <label htmlFor="producto-select">Producto:</label>
          <select
            id="producto-select"
            value={productoFilter}
            onChange={e => setProductoFilter(e.target.value)}
          >
            <option value="">Todos</option>
            {PRODUCT_OPTIONS.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
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
              {error && (
                <tr>
                  <td colSpan={6} style={{ color: "red" }}>{error}</td>
                </tr>
              )}
              {filteredProductos.length === 0 && !error && (
                <tr>
                  <td colSpan={6}>No hay productos registrados.</td>
                </tr>
              )}
              {filteredProductos.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.name}</td>
                  <td>{prod.description || "--"}</td>
                  <td>{prod.status || "--"}</td>
                  <td>{prod.quantity}</td>
                  <td>{prod.unit || "--"}</td>
                  <td>{prod.location || "--"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockProductos;
