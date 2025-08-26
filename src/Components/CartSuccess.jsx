import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CBU = "0000003100000001234567"; 
const WHATSAPP = "5491123456789";

const CartSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNumber, total } = location.state || {};

  if (!orderNumber || !total) {
    navigate("/cart");
    return null;
  }

  const whatsappMsg = encodeURIComponent(
    `Hola, mi número de compra es ${orderNumber} y adjunto el comprobante de transferencia.`
  );

  return (
    <div className="cart-container" style={{ textAlign: "center" }}>
      <h2>¡Gracias por tu compra!</h2>
      <p>
        <b>Número de compra:</b> <span style={{ color: "#ffd700" }}>{orderNumber}</span>
      </p>
      <p>
        <b>Total a pagar:</b> <span style={{ color: "#ffd700" }}>${total.toLocaleString()}</span>
      </p>
      <div style={{
        background: "#222", color: "#fff", borderRadius: "12px",
        padding: "1.5rem", margin: "2rem auto", maxWidth: 400
      }}>
        <b>Transferí el total a este CBU:</b>
        <div style={{ fontSize: "1.2rem", margin: "1rem 0", letterSpacing: 1 }}>
          {CBU}
        </div>
        <div>Banco Nación - Titular: Onda Estudio</div>
      </div>
      <p>
        Enviá el comprobante y tu número de compra por WhatsApp:
      </p>
      <a
        href={`https://wa.me/${WHATSAPP}?text=${whatsappMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          background: "#25d366",
          color: "#fff",
          padding: "0.8rem 2rem",
          borderRadius: "8px",
          fontWeight: "bold",
          fontSize: "1.1rem",
          textDecoration: "none",
          margin: "1rem 0"
        }}
      >
        Enviar por WhatsApp
      </a>
    </div>
  );
};

export default CartSuccess;