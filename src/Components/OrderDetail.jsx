import React, { useState } from "react";
import "../Styles/OrderDetail.css";
import AuthService from "../Service/AuthService";

const ESTADOS = [
  { value: "pending", label: "Pendiente" },
  { value: "paid", label: "Pagado" },
  { value: "processing", label: "En preparación" },
  { value: "shipped", label: "Enviado" },
  { value: "delivered", label: "Entregado" },
  { value: "cancelled", label: "Cancelado" }
];

export default function OrderDetail({ order, getEstadoLabel, onClose, onEstadoChange }) {
  const [estado, setEstado] = useState(order?.status || "");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  if (!order) return null;

  const handleEstadoChange = async (e) => {
    const nuevoEstado = e.target.value;
    setEstado(nuevoEstado);
    setLoading(true);
    setMsg("");
    try {
      await AuthService.updateOrderStatus(order.id, nuevoEstado);
      setMsg("Estado actualizado correctamente.");
      if (onEstadoChange) onEstadoChange(order.id, nuevoEstado);
    } catch {
      setMsg("No se pudo actualizar el estado.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-detail-modal">
      <div className="order-detail-content">
        <h3>Detalle de la orden #{order.id}</h3>
        <p><b>Cliente:</b> {order.user?.name || order.user_id || "--"}</p>
        <p><b>Email:</b> {order.user?.email || "--"}</p>
        <p>
          <b>Estado:</b>{" "}
          <select
            value={estado}
            onChange={handleEstadoChange}
            disabled={loading}
            style={{ marginLeft: 8 }}
          >
            {ESTADOS.map(e => (
              <option key={e.value} value={e.value}>{e.label}</option>
            ))}
          </select>
        </p>
        <p><b>Fecha:</b> {order.created_at?.slice(0,10) || "--"}</p>
        <p><b>Total:</b> ${order.total ?? "--"}</p>
        <h4>Productos:</h4>
        <ul>
          {order.items?.map((item, idx) => (
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
        {msg && (
          <div style={{ color: msg.includes("correctamente") ? "green" : "red", marginBottom: 8 }}>
            {msg}
          </div>
        )}
        <button className="btn cerrar" onClick={onClose} disabled={loading}>Cerrar</button>
      </div>
      <div className="order-detail-backdrop" onClick={onClose}></div>
    </div>
  );
}