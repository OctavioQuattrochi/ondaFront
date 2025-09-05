import React, { useEffect, useState } from 'react';
import Sidebar from '../Shared/Sidebar';
import '../../Styles/SuperAdmin/Presupuestos.css';
import { useNavigate } from 'react-router-dom';
import AuthService from "../../Service/AuthService";
import Paginator from "../Paginator";

const ESTADOS = {
  pendiente: "Pendiente de revisión",
  esperando_confirmacion: "Esperando confirmación del cliente",
  pendiente_pago: "Pendiente de pago",
  pagado: "Pagado",
  en_produccion: "En producción",
  listo_para_entregar: "Listo para entregar",
  entregado: "Entregado"
};

const Presupuestos = () => {
  const [presupuestos, setPresupuestos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.getAllQuotes()
      .then(data => {
        setPresupuestos(Array.isArray(data) ? data : []);
        setError("");
      })
      .catch(() => setError("No se pudieron cargar los presupuestos."))
      .finally(() => setLoading(false));
  }, []);

  // Filtra los presupuestos según el estado seleccionado
  const presupuestosFiltrados = filtroEstado
    ? presupuestos.filter(p => p.status === filtroEstado)
    : presupuestos;

  useEffect(() => {
    setPage(1);
  }, [filtroEstado]);

  const paginatedPresupuestos = presupuestosFiltrados.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="presupuestos-container">
        <h2 className="titulo">Presupuestos</h2>
        <div style={{ marginBottom: 16 }}>
          <label>
            <b>Filtrar por estado: </b>
            <select
              value={filtroEstado}
              onChange={e => setFiltroEstado(e.target.value)}
              style={{ marginLeft: 8, padding: 4, borderRadius: 4 }}
            >
              <option value="">Todos</option>
              {Object.entries(ESTADOS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="tabla-container">
          <table className="tabla">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Costo</th>
                <th>Ganancia</th>
                <th>Precio propuesto</th>
                <th>Estado</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6}>Cargando...</td></tr>
              ) : error ? (
                <tr><td colSpan={6} style={{ color: "red" }}>{error}</td></tr>
              ) : paginatedPresupuestos.length === 0 ? (
                <tr><td colSpan={6}>No hay presupuestos para mostrar.</td></tr>
              ) : (
                paginatedPresupuestos.map((fila) => (
                  <tr key={fila.id}>
                    <td>{fila.user?.name || fila.user_id}</td>
                    <td>${fila.cost || "--"}</td>
                    <td>${fila.profit || "--"}</td>
                    <td>${fila.estimated_price || "--"}</td>
                    <td>{ESTADOS[fila.status] || fila.status || "--"}</td>
                    <td>
                      <button
                        className="ver-detalle-btn"
                        onClick={() => navigate(`/detalle-presupuesto/${fila.id}`)}
                      >
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
          total={presupuestosFiltrados.length}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Presupuestos;
