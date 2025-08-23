import React, { useEffect, useState } from 'react';
import Sidebar from '../Shared/Sidebar';
import '../../Styles/Admin/StockProductos.css';
import AuthService from "../../Service/AuthService";

const StockProductos = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");
  const [productoFilter, setProductoFilter] = useState("");

  useEffect(() => {
    AuthService.getPredefinedProducts()
      .then(data => {
        setProductos(data);
        setError("");
      })
      .catch(() => setError("No se pudieron cargar los productos."));
  }, []);

  // Filtra por nombre de producto (usa prod.name o prod.material)
  const filteredProductos = productos.filter(prod =>
    productoFilter
      ? (prod.name || prod.material || "").toLowerCase() === productoFilter.toLowerCase()
      : true
  );

  // Opciones únicas para el filtro select
  const uniqueOptions = Array.from(
    new Set(productos.map(prod => prod.name || prod.material).filter(Boolean))
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
            {uniqueOptions.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="tabla-container">
          <table className="tabla">
            <thead>
              <tr>
                <th>Material</th>
                <th>Cantidad</th>
                <th>Ubicación</th>
              </tr>
            </thead>
            <tbody>
              {error && filteredProductos.length === 0 && (
                <tr>
                  <td colSpan={3} style={{ color: "red" }}>{error}</td>
                </tr>
              )}
              {filteredProductos.length === 0 && !error && (
                <tr>
                  <td colSpan={3}>No hay productos registrados.</td>
                </tr>
              )}
              {filteredProductos.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.name || prod.material || "--"}</td>
                  <td>{prod.quantity}</td>
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
