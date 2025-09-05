import React, { useEffect, useState } from "react";
import Sidebar from "../Shared/Sidebar";
import AuthService from "../../Service/AuthService";
import "../../Styles/users.css"; // Reutiliza estilos si ya tienes uno general

export default function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [clienteFilter, setClienteFilter] = useState("");
  const [tipoFilter, setTipoFilter] = useState("");

  const fetchVentas = async () => {
    setLoading(true);
    setError("");
    try {
      const filtros = {};
      if (fechaInicio) filtros.fecha_inicio = fechaInicio;
      if (fechaFin) filtros.fecha_fin = fechaFin;
      if (clienteFilter) filtros.cliente = clienteFilter;
      if (tipoFilter) filtros.tipo = tipoFilter;
      const data = await AuthService.getVentas(filtros);
      setVentas(Array.isArray(data) ? data : (data.data || []));
    } catch {
      setError("No se pudieron cargar las ventas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVentas();
    // eslint-disable-next-line
  }, []);

  const handleFiltrar = (e) => {
    e.preventDefault();
    fetchVentas();
  };

  // Filtros locales si el backend no los soporta
  const ventasFiltradas = ventas.filter(v => {
    const matchCliente = clienteFilter
      ? (v.cliente || v.user?.name || v.user_id || "").toLowerCase().includes(clienteFilter.toLowerCase())
      : true;
    const matchTipo = tipoFilter
      ? (v.tipo || "").toLowerCase() === tipoFilter.toLowerCase()
      : true;
    return matchCliente && matchTipo;
  });

  // Opciones de tipo (puedes ajustar según tu backend)
  const tipos = ["", "producto", "personalizado", "servicio"];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="presupuestos-container">
        <h2 className="titulo">Listado de Ventas</h2>
        <form style={{ marginBottom: 16, display: "flex", gap: 12, flexWrap: "wrap" }} onSubmit={handleFiltrar}>
          <div>
            <label>Desde: </label>
            <input
              type="date"
              value={fechaInicio}
              onChange={e => setFechaInicio(e.target.value)}
            />
          </div>
          <div>
            <label>Hasta: </label>
            <input
              type="date"
              value={fechaFin}
              onChange={e => setFechaFin(e.target.value)}
            />
          </div>
          <div>
            <label>Cliente: </label>
            <input
              type="text"
              value={clienteFilter}
              onChange={e => setClienteFilter(e.target.value)}
              placeholder="Buscar cliente..."
            />
          </div>
          <div>
            <label>Tipo: </label>
            <select
              value={tipoFilter}
              onChange={e => setTipoFilter(e.target.value)}
            >
              {tipos.map((tipo, idx) => (
                <option key={idx} value={tipo}>{tipo ? tipo.charAt(0).toUpperCase() + tipo.slice(1) : "Todos"}</option>
              ))}
            </select>
          </div>
          <button type="submit">Filtrar</button>
        </form>
        <div className="tabla-container">
          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Detalle</th>
                <th>Costo total</th>
                <th>Total ingresado</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7}>Cargando...</td></tr>
              ) : error ? (
                <tr><td colSpan={7} style={{ color: "red" }}>{error}</td></tr>
              ) : ventasFiltradas.length === 0 ? (
                <tr><td colSpan={7}>No hay ventas para mostrar.</td></tr>
              ) : (
                ventasFiltradas.map(v => (
                  <tr key={v.id}>
                    <td>{v.id}</td>
                    <td>{v.fecha || v.created_at?.slice(0,10) || "--"}</td>
                    <td>{v.cliente || v.user?.name || v.user_id || "--"}</td>
                    <td>{v.detalle || v.productos || v.descripcion || "--"}</td>
                    <td>${v.costo_total ?? "--"}</td>
                    <td>${v.total_ingresado ?? "--"}</td>
                    <td>{v.tipo || "--"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}