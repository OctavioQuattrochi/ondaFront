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
  { value: "entregado", label: "Entregado" }
];

const PresupuestoDetalle = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [presupuesto, setPresupuesto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [precioFinal, setPrecioFinal] = useState("");
  const [estado, setEstado] = useState("pendiente");
  const [error, setError] = useState("");

  useEffect(() => {
    AuthService.getQuoteById(id)
      .then(data => {
        setPresupuesto(data);
        setPrecioFinal(data.estimated_price || "");
        setEstado(data.status || "pendiente");
      })
      .catch(() => setError("No se pudo cargar el presupuesto."))
      .finally(() => setLoading(false));
  }, [id]);

  // Usa la variable de entorno de Vite
  const API_URL = import.meta.env.VITE_API_URL;
  const imagenUrl = presupuesto?.image
    ? `${API_URL}/storage/${presupuesto.image}`
    : null;

  // Log para debug
  useEffect(() => {
    console.log("Imagen URL:", imagenUrl);
  }, [imagenUrl]);

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
          <div className="detalle-info">
            <p>
              <b>Producto personalizado Nº{presupuesto.id}</b>
              <br />
              <span>Cliente: {presupuesto.user?.name || "--"} (ID: {presupuesto.user_id})</span>
            </p>
            <p><strong>Tamaño:</strong> {presupuesto.width_cm} × {presupuesto.height_cm} cm</p>
            <p><strong>Color:</strong> {presupuesto.color}</p>

            {imagenUrl && (
              <button
                className="btn-ver-imagen"
                onClick={() => window.open(imagenUrl, "_blank")}
              >
                Ver imagen adjunta
              </button>
            )}

            <div className="desglose-box grande">
              <h4>Desglose del presupuesto</h4>
              <textarea
                value={presupuesto.breakdown || "No hay desglose disponible."}
                readOnly
                className="desglose-textarea"
              />
            </div>

            <label className="input-label">
              <strong>Precio final:</strong> $
              <input
                type="number"
                value={precioFinal}
                onChange={e => setPrecioFinal(e.target.value)}
                min="0"
                className="input-precio"
              />
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
        </div>
        <div className="detalle-footer">
          <button onClick={() => navigate(-1)}>Atrás</button>
        </div>
      </div>
    </div>
  );
};

export default PresupuestoDetalle;
