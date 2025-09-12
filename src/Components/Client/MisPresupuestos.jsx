import React, { useEffect, useState } from "react";
import "../../Styles/Client/MisPresupuestos.css";
import AuthService from "../../Service/AuthService";
import Paginator from "../Paginator";

const ESTADOS = {
  pendiente: "Pendiente de revisión",
  esperando_confirmacion: "Esperando confirmación del cliente",
  pendiente_pago: "Pendiente de pago",
  pagado: "Pagado",
  en_produccion: "En producción",
  listo_para_entregar: "Listo para entregar",
  entregado: "Entregado",
  cancelado: "Cancelado",
};

export default function MisPresupuestos() {
  const [presupuestos, setPresupuestos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [accionLoading, setAccionLoading] = useState(null);
  const [filtroEstado, setFiltroEstado] = useState("");

  useEffect(() => {
    cargarPresupuestos();
    // eslint-disable-next-line
  }, []);

  const cargarPresupuestos = () => {
    setLoading(true);
    AuthService.getQuotes()
      .then((data) => {
        if (Array.isArray(data)) {
          setPresupuestos(data);
        } else if (Array.isArray(data.data)) {
          setPresupuestos(data.data);
        } else if (Array.isArray(data.quotes)) {
          setPresupuestos(data.quotes);
        } else {
          setPresupuestos([]);
        }
      })
      .catch(() => setPresupuestos([]))
      .finally(() => setLoading(false));
  };

  const handleAccion = async (id, accion) => {
    setAccionLoading(id);
    try {
      if (accion === "aceptar") {
        await AuthService.updateQuote(id, { status: "pendiente_pago" });
        cargarPresupuestos();
      }
      if (accion === "rechazar") {
        await AuthService.updateQuote(id, { status: "cancelado" }); 
        cargarPresupuestos();
      }
    } catch {
      // Podrías mostrar un error aquí si quieres
    } finally {
      setAccionLoading(null);
    }
  };

  // Filtrar por estado
  const presupuestosFiltrados = filtroEstado
    ? presupuestos.filter((p) => p.status === filtroEstado)
    : presupuestos;

  useEffect(() => {
    setPage(1);
  }, [filtroEstado]);

  const paginatedPresupuestos = presupuestosFiltrados.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="mis-compras-container">
      <h2 className="titulo-compras">Mis presupuestos</h2>
      <div style={{ marginBottom: 16 }}>
        <label>
          <b>Filtrar por estado: </b>
          <select
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            style={{ marginLeft: 8, padding: 4, borderRadius: 4 }}
          >
            <option value="">Todos</option>
            {Object.entries(ESTADOS).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="tabla-contenedor">
        <table className="tabla-compras">
          <thead>
            <tr>
              <th>ID</th>
              <th>Detalle</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5}>Cargando...</td>
              </tr>
            ) : paginatedPresupuestos.length === 0 ? (
              <tr>
                <td colSpan={5}>No tienes presupuestos aún.</td>
              </tr>
            ) : (
              paginatedPresupuestos.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    {item.color} - {item.height_cm}x{item.width_cm}cm
                  </td>
                  <td>
                    {item.estimated_price
                      ? `$${Number(item.estimated_price).toLocaleString("es-AR")}`
                      : "$------"}
                  </td>
                  <td>{ESTADOS[item.status] || item.status || "--"}</td>
                  <td>
                    {item.status === "esperando_confirmacion" && (
                      <>
                        <button
                          className="btn aceptar"
                          onClick={() => handleAccion(item.id, "aceptar")}
                          disabled={accionLoading === item.id}
                        >
                          {accionLoading === item.id ? "Procesando..." : "Aceptar"}
                        </button>
                        <button
                          className="btn cancelar"
                          onClick={() => handleAccion(item.id, "rechazar")}
                          disabled={accionLoading === item.id}
                          style={{ marginLeft: 8 }}
                        >
                          Rechazar
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <Paginator
        total={presupuestosFiltrados.length}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
}
