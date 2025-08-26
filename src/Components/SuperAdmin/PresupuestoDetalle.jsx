import React, { useEffect, useState } from 'react';
import Sidebar from '../Shared/Sidebar';
import '../../Styles/SuperAdmin/PresupuestoDetalle.css';
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from "../../Service/AuthService";

// Array de estados sincronizado con el backend
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

  const handleGuardar = async () => {
    try {
      await AuthService.updateQuote(id, {
        estimated_price: precioFinal,
        status: estado,
      });
      navigate(-1); // Vuelve atrás al guardar
    } catch {
      setError("No se pudo guardar el presupuesto.");
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!presupuesto) return <div>No se encontró el presupuesto.</div>;

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <div className="detalle-container">
        <h2 className="detalle-titulo">Presupuesto a confirmar - Detalle</h2>

        <div className="detalle-contenido">
          <div className="detalle-info">
            <p>Producto personalizado Nº{presupuesto.id} - Cliente {presupuesto.user_id}: {presupuesto.user?.name || "--"}</p>
            <p><strong>Tamaño:</strong> {presupuesto.width_cm} × {presupuesto.height_cm} centímetros</p>
            <p><strong>Color:</strong> {presupuesto.color}</p>
            <p><strong>Especificaciones del cliente:</strong> {presupuesto.note || "-"}</p>
            <p><strong>Total de metros a utilizar:</strong> {/* Puedes calcularlo si tienes el dato */}</p>

            <label>
              <strong>Precio final:</strong> $ 
              <input
                type="number"
                value={precioFinal}
                onChange={e => setPrecioFinal(e.target.value)}
                min="0"
              />
            </label>

            <label>
              <strong>Estado:</strong>
              <select value={estado} onChange={e => setEstado(e.target.value)}>
                {ESTADOS.map(e => (
                  <option key={e.value} value={e.value}>{e.label}</option>
                ))}
              </select>
            </label>

            <button className="guardar-btn" onClick={handleGuardar}>Guardar</button>
          </div>

          <div className="detalle-imagen">
            {/* Si tienes la imagen, muéstrala aquí */}
            {/* <img src={presupuesto.image_url} alt="Producto" /> */}
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
