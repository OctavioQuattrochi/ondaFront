import React, { useEffect, useState } from "react";
import Sidebar from "./Shared/Sidebar";
import AuthService from "../Service/AuthService";
import "../Styles/orders.css";
import Paginator from "./Paginator";
import OrderDetail from "./OrderDetail"; // Importa la nueva vista

const ESTADOS = [
  { value: "", label: "Todos" },
  { value: "pending", label: "Pendiente" },
  { value: "paid", label: "Pagado" },
  { value: "processing", label: "En preparación" },
  { value: "shipped", label: "Enviado" },
  { value: "delivered", label: "Entregado" },
  { value: "cancelled", label: "Cancelado" }
];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("");
  const [clienteFilter, setClienteFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const pageSize = 10;

  useEffect(() => {
    AuthService.getOrders()
      .then(data => setOrders(Array.isArray(data) ? data : []))
      .catch(() => setError("No se pudieron cargar las órdenes."))
      .finally(() => setLoading(false));
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchEstado = estadoFilter
      ? (order.status || "").toLowerCase() === estadoFilter.toLowerCase()
      : true;
    const matchCliente = clienteFilter
      ? (order.user?.name || order.user_id || "").toLowerCase().includes(clienteFilter.toLowerCase())
      : true;
    return matchEstado && matchCliente;
  });

  const paginatedOrders = filteredOrders.slice((page - 1) * pageSize, page * pageSize);

  const getEstadoLabel = (value) => {
    const estado = ESTADOS.find(e => e.value === value);
    return estado ? estado.label : value || "--";
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="orders-container">
        <h2 className="titulo">Listado de Órdenes</h2>
        <div style={{ marginBottom: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <label>
            Estado:
            <select
              value={estadoFilter}
              onChange={e => {
                setEstadoFilter(e.target.value);
                setPage(1);
              }}
            >
              {ESTADOS.map((estado, idx) => (
                <option key={idx} value={estado.value}>{estado.label}</option>
              ))}
            </select>
          </label>
          <label>
            Cliente:
            <input
              type="text"
              value={clienteFilter}
              onChange={e => {
                setClienteFilter(e.target.value);
                setPage(1);
              }}
              placeholder="Buscar cliente..."
            />
          </label>
        </div>
        <div className="tabla-container">
          <table className="tabla">
            <thead>
              <tr>
                <th>ID Orden</th>
                <th>Cliente</th>
                <th>Email</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Detalle</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={8}>Cargando...</td></tr>
              ) : error ? (
                <tr><td colSpan={8} style={{ color: "red" }}>{error}</td></tr>
              ) : paginatedOrders.length === 0 ? (
                <tr><td colSpan={8}>No hay órdenes para mostrar.</td></tr>
              ) : (
                paginatedOrders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.user?.name || order.user_id || "--"}</td>
                    <td>{order.user?.email || "--"}</td>
                    <td>{getEstadoLabel(order.status)}</td>
                    <td>{order.created_at?.slice(0,10) || "--"}</td>
                    <td>
                      <ul>
                        {order.items?.map((item, idx) => (
                          <li key={idx}>
                            {item.product ? item.product.name : "Producto eliminado"} x{item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>${order.total ?? "--"}</td>
                    <td>
                      <button onClick={() => setSelectedOrder(order)}>
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Paginator
          total={filteredOrders.length}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
        />
        {selectedOrder && (
          <OrderDetail
            order={selectedOrder}
            getEstadoLabel={getEstadoLabel}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </div>
    </div>
  );
}