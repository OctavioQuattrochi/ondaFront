import React, { useEffect, useState } from 'react';
import Sidebar from '../Shared/Sidebar';
import '../../Styles/Admin/StockProductos.css';
import AuthService from "../../Service/AuthService";
import Paginator from "../Paginator";

const StockProductos = () => {
  const [stock, setStock] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [productoFilter, setProductoFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;

  useEffect(() => {
    Promise.all([
      AuthService.getStock()
        .then(data => setStock(Array.isArray(data) ? data : []))
        .catch(() => setError("No se pudo cargar el stock de productos.")),
      AuthService.getProducts()
        .then(data => setProducts(Array.isArray(data) ? data : []))
        .catch(() => {})
    ]).finally(() => setLoading(false));
  }, []);

  const filteredStock = stock.filter(item => {
    const matchProducto = productoFilter
      ? (item.product_name || "").toLowerCase().includes(productoFilter.toLowerCase())
      : true;
    const matchColor = colorFilter
      ? (item.color || "").toLowerCase().includes(colorFilter.toLowerCase())
      : true;
    return matchProducto && matchColor;
  });

  const paginatedStock = filteredStock.slice((page - 1) * pageSize, page * pageSize);

  const getPrecio = (item) => {
    if (item.price !== undefined && item.price !== null) return `$${item.price}`;
    const prod = products.find(p => p.id === item.product_id);
    return prod?.final_price ? `$${prod.final_price}` : "--";
  };

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
        </div>
        <div className="tabla-container">
          <table className="tabla">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Color</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", color: "#a95ff7", fontWeight: "bold" }}>
                    Cargando productos...
                  </td>
                </tr>
              ) : (
                <>
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
                  {paginatedStock.map((item) => (
                    <tr key={item.id}>
                      <td>{item.product_name}</td>
                      <td>{item.color || "--"}</td>
                      <td>{item.quantity}</td>
                      <td>{getPrecio(item)}</td>
                    </tr>
                  ))}
                </>
              )}
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
