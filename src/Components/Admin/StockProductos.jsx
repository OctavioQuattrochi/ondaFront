import React, { useEffect, useState } from 'react';
import Sidebar from '../Shared/Sidebar';
import '../../Styles/Admin/StockProductos.css';
import AuthService from "../../Service/AuthService";

const StockProductos = () => {
  const [stock, setStock] = useState([]);
  const [error, setError] = useState("");
  const [productoFilter, setProductoFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");

  useEffect(() => {
    AuthService.getStock()
      .then(data => setStock(Array.isArray(data) ? data : []))
      .catch(() => setError("No se pudo cargar el stock de productos."));
  }, []);

  const filteredStock = stock.filter(item => {
    const matchProducto = productoFilter
      ? (item.name || "").toLowerCase().includes(productoFilter.toLowerCase())
      : true;
    const matchColor = colorFilter
      ? (item.color || "").toLowerCase().includes(colorFilter.toLowerCase())
      : true;
    return matchProducto && matchColor;
  });

  return (
    <div className="stock-productos-layout">
      <Sidebar />
      <div className="stock-productos-container">
        <h1 className="titulo">Stock de productos</h1>
        <div className="filtros">
          <label>
            Producto:
            <input
              type="text"
              value={productoFilter}
              onChange={e => setProductoFilter(e.target.value)}
              placeholder="Buscar producto..."
            />
          </label>
          <label>
            Color:
            <input
              type="text"
              value={colorFilter}
              onChange={e => setColorFilter(e.target.value)}
              placeholder="Buscar color..."
            />
          </label>
        </div>
        <div className="tabla-container">
          <table className="tabla">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Color</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {error && (
                <tr>
                  <td colSpan={3} style={{ color: "red" }}>{error}</td>
                </tr>
              )}
              {filteredStock.length === 0 && !error && (
                <tr>
                  <td colSpan={3}>No hay productos en stock.</td>
                </tr>
              )}
              {filteredStock.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.color || "--"}</td>
                  <td>{item.quantity}</td>
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
