import React, { useEffect, useState } from "react";
import "../../Styles/Client/MisCompras.css";
import AuthService from "../../Service/AuthService";
import Paginator from "../Paginator";

export default function MisCompras() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    AuthService.getOrders()
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setError("No se pudieron cargar las compras."));
  }, []);

  const paginatedOrders = orders.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="mis-compras-container">
      <h2 className="titulo-compras">Mis compras</h2>
      <div className="tabla-contenedor">
        <table className="tabla-compras">
          <thead>
            <tr>
              <th>ID Orden</th>
              <th>Productos</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td colSpan={4}>No hay compras registradas.</td>
              </tr>
            )}
            {paginatedOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  <ul>
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.variant && item.variant.product
                          ? `${item.variant.product.name} (${item.variant.color})`
                          : item.variant
                            ? `Producto eliminado (${item.variant.color})`
                            : item.product
                              ? `${item.product.name} (${item.product.color})`
                              : "Producto eliminado"
                        } x{item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>${order.total}</td>
                <td
                  className={
                    order.status === "delivered" || order.status === "entregado"
                      ? "entregado"
                      : "pendiente"
                  }
                >
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Paginator
          total={orders.length}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
    </div>
  );
}
