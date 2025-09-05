import React, { useEffect, useState } from 'react';
import Sidebar from '../Shared/Sidebar';
import '../../Styles/Admin/StockProductos.css';
import AuthService from "../../Service/AuthService";
import Paginator from "../Paginator";

const ESTADOS = [
  "Pendiente",
  "En produccion",
  "Finalizado"
];

const StockProductos = () => {
  const [stock, setStock] = useState([]);
  const [error, setError] = useState("");
  const [productoFilter, setProductoFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

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
    const matchEstado = estadoFilter
      ? (item.status || "").toLowerCase() === estadoFilter.toLowerCase()
      : true;
    return matchProducto && matchColor && matchEstado;
  });

  const paginatedStock = filteredStock.slice((page - 1) * pageSize, page * pageSize);

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
              onChange={e => {
                setProductoFilter(e.target.value);
                setPage(1);
              }}
              placeholder="Buscar producto..."
            />
          </label>
          <label>
            Color:
            <input
              type="text"
              value={colorFilter}
              onChange={e => {
                setColorFilter(e.target.value);
                setPage(1);
              }}
              placeholder="Buscar color..."
            />
          </label>
          <label>
            Estado:
            <select
              value={estadoFilter}
              onChange={e => {
                setEstadoFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Todos</option>
              {ESTADOS.map((estado, idx) => (
                <option key={idx} value={estado}>{estado}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="tabla-container">
          <table className="tabla">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Color</th>
                <th>Cantidad</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {error && (
                <tr>
                  <td colSpan={4} style={{ color: "red" }}>{error}</td>
                </tr>
              )}
              {paginatedStock.length === 0 && !error && (
                <tr>
                  <td colSpan={4}>No hay productos en stock.</td>
                </tr>
              )}
              {paginatedStock.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.color || "--"}</td>
                  <td>{item.quantity}</td>
                  <td>{item.status || "--"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Paginator
          total={filteredStock.length}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default StockProductos;
