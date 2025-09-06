import React from "react";
import "../Styles/OrderDetail.css";

export default function OrderDetail({ order, getEstadoLabel, onClose }) {
  if (!order) return null;

  return (
    <div className="order-detail-modal">
      <div className="order-detail-content">
        <h3>Detalle de la orden #{order.id}</h3>
        <p><b>Cliente:</b> {order.user?.name || order.user_id || "--"}</p>
        <p><b>Email:</b> {order.user?.email || "--"}</p>
        <p><b>Estado:</b> {getEstadoLabel(order.status)}</p>
        <p><b>Fecha:</b> {order.created_at?.slice(0,10) || "--"}</p>
        <p><b>Total:</b> ${order.total ?? "--"}</p>
        <h4>Productos:</h4>
        <ul>
          {order.items?.map((item, idx) => (
            <li key={idx}>
              {item.product ? item.product.name : "Producto eliminado"} x{item.quantity}
            </li>
          ))}
        </ul>
        <button className="btn cerrar" onClick={onClose}>Cerrar</button>
      </div>
      <div className="order-detail-backdrop" onClick={onClose}></div>
    </div>
  );
}