import React, { useEffect, useState } from 'react';
import Sidebar from '../Shared/Sidebar';
import '../../Styles/SuperAdmin/PresupuestoDetalle.css';
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from "../../Service/AuthService";

const ESTADOS = [
  { value: "pendiente", label: "Pendiente de revisión" },
  { value: "esperando_confirmacion", label: "Esperando confirmación del cliente" },
  { value: "pendiente_pago", label: "Pendiente de pago" },
  { value: "pagado", label: "Pagado" },
  { value: "en_produccion", label: "En producción" },
  { value: "listo_para_entregar", label: "Listo para entregar" },
  { value: "entregado", label: "Entregado" },
  { value: "cancelado", label: "Cancelado" }
];

const COLOR_LABELS = {
  "warm-white": "Blanco cálido",
  "cool-white": "Blanco frío",
  "yellow": "Amarillo",
  "red": "Rojo",
  "blue": "Azul",
  "green": "Verde"
};

const PresupuestoDetalle = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [presupuesto, setPresupuesto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [precioFinal, setPrecioFinal] = useState("");
  const [estado, setEstado] = useState("pendiente");
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    AuthService.getQuoteById(id)
      .then(data => {
        setPresupuesto(data);
        setPrecioFinal(data.estimated_price || "");
        setEstado(data.status || "pendiente");
      })
      .catch(() => setError("No se pudo cargar el presupuesto."))
      .finally(() => setLoading(false));

    const user = JSON.parse(localStorage.getItem("user"));
    setUserRole(user?.role || "");
  }, [id]);

  const API_URL = import.meta.env.VITE_API_URL;
  const imagenUrl = presupuesto?.image
    ? `${API_URL}/storage/${presupuesto.image}`
    : null;

  const handleGuardar = async () => {
    try {
      await AuthService.updateQuote(id, {
        estimated_price: precioFinal,
        status: estado,
      });
      navigate(-1);
    } catch {
      setError("No se pudo guardar el presupuesto.");
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!presupuesto) return <div>No se encontró el presupuesto.</div>;

  return (
    <div className="presupuesto-layout">
      <Sidebar />
      <div className="detalle-container">
        <h2 className="detalle-titulo">Presupuesto - Detalle</h2>
        <div className="detalle-contenido">
          <div className="detalle-info" style={{ background: "#181818", borderRadius: 12, padding: "18px 0", boxShadow: "0 2px 12px #0002", marginBottom: 16 }}>
            <div style={{ fontSize: "1.3rem", fontWeight: 600, marginBottom: 8 }}>
              Producto personalizado Nº{presupuesto.id}
            </div>
            <div style={{ fontSize: "1rem", marginBottom: 12 }}>
              <span style={{ color: "#bdbdbd" }}>Cliente:</span>{" "}
              <span style={{ fontWeight: 500 }}>{presupuesto.user?.name || "--"}</span>
              <span style={{ color: "#888" }}> (ID: {presupuesto.user_id})</span>
            </div>
            <div style={{ fontSize: "1.1rem", marginBottom: 8 }}>
              <strong>Tamaño:</strong>{" "}
              <span style={{ color: "#a95ff7" }}>{presupuesto.width_cm} × {presupuesto.height_cm} cm</span>
            </div>
            <div style={{ fontSize: "1.1rem", marginBottom: 8 }}>
              <strong>Color:</strong>{" "}
              <span style={{ color: "#a95ff7" }}>{COLOR_LABELS[presupuesto.color] || presupuesto.color}</span>
            </div>
            {imagenUrl && (
              <button
                className="btn-ver-imagen"
                style={{ margin: "12px 0", background: "#222", color: "#a95ff7", border: "1px solid #a95ff7", borderRadius: 8, padding: "8px 18px", cursor: "pointer" }}
                onClick={() => window.open(imagenUrl, "_blank")}
              >
                Ver imagen adjunta
              </button>
            )}
          </div>

          <div className="desglose-box grande">
            <h4>Desglose del presupuesto</h4>
            <textarea
              value={presupuesto.breakdown || "No hay desglose disponible."}
              readOnly
              className="desglose-textarea"
            />
          </div>

          <label className="input-label" style={{ marginTop: 18 }}>
            <strong>Precio final:</strong> $
            <input
              type="number"
              value={precioFinal}
              onChange={e => setPrecioFinal(e.target.value)}
              min="0"
              className="input-precio"
              disabled={userRole !== "superadmin"}
              style={userRole !== "superadmin" ? { background: "#333", color: "#aaa", cursor: "not-allowed" } : {}}
            />
            {userRole !== "superadmin" && (
              <span style={{ marginLeft: 8, color: "#a95ff7", fontSize: "0.95rem" }}>
                (Solo editable por superadmin)
              </span>
            )}
          </label>

          <label className="input-label">
            <strong>Estado:</strong>
            <select value={estado} onChange={e => setEstado(e.target.value)}>
              {ESTADOS.map(e => (
                <option key={e.value} value={e.value}>{e.label}</option>
              ))}
            </select>
          </label>

          <button className="guardar-btn" onClick={handleGuardar}>Guardar</button>
        </div>
        <div className="detalle-footer">
          <button onClick={() => navigate(-1)}>Atrás</button>
        </div>
      </div>
    </div>
  );
};

export default PresupuestoDetalle;
