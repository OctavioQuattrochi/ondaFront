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

  // Calcular metros cuadrados si hay datos
  const metrosCuadrados = presupuesto?.width_cm && presupuesto?.height_cm
    ? ((presupuesto.width_cm / 100) * (presupuesto.height_cm / 100)).toFixed(2)
    : "--";

  // Extraer desglose del campo raw_response si existe
  let desglose = [];
  if (presupuesto?.breakdown && Array.isArray(presupuesto.breakdown)) {
    desglose = presupuesto.breakdown;
  } else if (presupuesto?.raw_response) {
    try {
      const raw = typeof presupuesto.raw_response === "string"
        ? JSON.parse(presupuesto.raw_response)
        : presupuesto.raw_response;

      // Si el desglose está como array
      if (raw.breakdown && Array.isArray(raw.breakdown)) {
        desglose = raw.breakdown;
      } else if (raw.choices && Array.isArray(raw.choices) && raw.choices[0]?.message?.content) {
        // Si el desglose está como texto en message.content
        const content = raw.choices[0].message.content;
        const lines = content.split("\n").map(l => l.trim()).filter(Boolean);
        desglose = lines
          .filter(line =>
            line.toLowerCase().includes("neón") ||
            line.toLowerCase().includes("fuente") ||
            line.toLowerCase().includes("acrílico") ||
            line.toLowerCase().includes("total")
          )
          .map(line => ({ detalle: line }));
      }
    } catch (e) {
      desglose = [];
    }
  }

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
            <p>
              <b>Producto personalizado Nº{presupuesto.id}</b>
              <br />
              <span>Cliente: {presupuesto.user?.name || "--"} (ID: {presupuesto.user_id})</span>
            </p>
            <p><strong>Tamaño:</strong> {presupuesto.width_cm} × {presupuesto.height_cm} cm</p>
            <p><strong>Color:</strong> {presupuesto.color}</p>
            <p><strong>Especificaciones del cliente:</strong> {presupuesto.note || "-"}</p>
            <p>
              <strong>Total de metros cuadrados a utilizar:</strong>{" "}
              <span className="metros">{metrosCuadrados} m²</span>
            </p>

            <div className="desglose-box">
              <h4>Desglose del presupuesto</h4>
              {desglose.length === 0 ? (
                <p>No hay desglose disponible.</p>
              ) : (
                <table className="desglose-tabla">
                  <thead>
                    <tr>
                      <th>Detalle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {desglose.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          {item.detalle ||
                            [
                              item.material && `Material: ${item.material}`,
                              item.cantidad && `Cantidad: ${item.cantidad}`,
                              item.costo_unitario !== undefined && `Costo unitario: $${Number(item.costo_unitario).toLocaleString("es-AR")}`,
                              item.costo_total !== undefined && `Costo total: $${Number(item.costo_total).toLocaleString("es-AR")}`
                            ].filter(Boolean).join(" | ")
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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
