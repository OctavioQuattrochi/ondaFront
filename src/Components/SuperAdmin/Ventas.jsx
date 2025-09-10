import React, { useEffect, useState } from "react";
import Sidebar from "../Shared/Sidebar";
import AuthService from "../../Service/AuthService";
import "../../Styles/users.css";
import Paginator from "../Paginator";

export default function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [clienteFilter, setClienteFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const fetchVentas = async () => {
    setLoading(true);
    setError("");
    try {
      const filtros = {};
      if (fechaInicio) filtros.fecha_inicio = fechaInicio;
      if (fechaFin) filtros.fecha_fin = fechaFin;
      if (clienteFilter) filtros.cliente = clienteFilter;
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
    setPage(1);
  };

  // Mostrar solo ventas con estado pagado o posterior
  const ventasFiltradas = ventas.filter(v => {
    const estado = (v.status || v.estado || "").toLowerCase();
    const estadosValidos = ["paid", "processing", "shipped", "delivered"];
    const esVentaValida = estadosValidos.includes(estado);
    const matchCliente = clienteFilter
      ? (v.cliente || v.user?.name || v.user_id || "").toLowerCase().includes(clienteFilter.toLowerCase())
      : true;
    return esVentaValida && matchCliente;
  });

  const paginatedVentas = ventasFiltradas.slice((page - 1) * pageSize, page * pageSize);

  // Calcular el total ingresado en el rango filtrado
  const totalIngresado = ventasFiltradas.reduce(
    (acc, v) => acc + (parseFloat(v.total) || 0),
    0
  );

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
          <button type="submit">Filtrar</button>
        </form>
        <div className="tabla-container">
          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Order</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>Total ingresado</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5}>Cargando...</td></tr>
              ) : error ? (
                <tr><td colSpan={5} style={{ color: "red" }}>{error}</td></tr>
              ) : paginatedVentas.length === 0 ? (
                <tr><td colSpan={5}>No hay ventas para mostrar.</td></tr>
              ) : (
                paginatedVentas.map(v => (
                  <tr key={v.id}>
                    <td>{v.id}</td>
                    <td>{v.order_number || v.order || "--"}</td>
                    <td>{v.fecha || v.created_at?.slice(0,10) || "--"}</td>
                    <td>{v.cliente || v.user?.name || v.user_id || "--"}</td>
                    <td>${v.total ?? "--"}</td>
                  </tr>
                ))
              )}
              {/* Fila de subtotal */}
              {!loading && !error && ventasFiltradas.length > 0 && (
                <tr style={{ background: "#222", fontWeight: "bold" }}>
                  <td colSpan={4} style={{ textAlign: "right" }}>Total ingresado en el rango:</td>
                  <td>${totalIngresado.toLocaleString()}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Paginator
          total={ventasFiltradas.length}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}