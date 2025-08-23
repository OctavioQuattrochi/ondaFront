import React, { useEffect, useState } from 'react';
import Sidebar from '../Shared/Sidebar';
import '../../Styles/SuperAdmin/Presupuestos.css';
import { useNavigate } from 'react-router-dom';
import AuthService from "../../Service/AuthService";

const Presupuestos = () => {
  const [presupuestos, setPresupuestos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.getPendingQuotes()
      .then(data => {
        setPresupuestos(Array.isArray(data) ? data : []);
        setError("");
      })
      .catch(() => setError("No se pudieron cargar los presupuestos."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="presupuestos-container">
        <h2 className="titulo">Presupuestos a confirmar</h2>
        <div className="tabla-container">
          <table className="tabla">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Costo</th>
                <th>Ganancia</th>
                <th>Precio propuesto</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5}>Cargando...</td></tr>
              ) : error ? (
                <tr><td colSpan={5} style={{ color: "red" }}>{error}</td></tr>
              ) : presupuestos.length === 0 ? (
                <tr><td colSpan={5}>No hay presupuestos pendientes.</td></tr>
              ) : (
                presupuestos.map((fila) => (
                  <tr key={fila.id}>
                    <td>{fila.user?.name || fila.user_id}</td>
                    <td>${fila.cost || "--"}</td>
                    <td>${fila.profit || "--"}</td>
                    <td>${fila.estimated_price || "--"}</td>
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
      </div>
    </div>
  );
};

export default Presupuestos;
