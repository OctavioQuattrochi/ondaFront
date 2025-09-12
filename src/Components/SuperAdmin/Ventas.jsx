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

      // Unificar orders y quotes en un solo array
      const orders = Array.isArray(data.orders) ? data.orders : [];
      const quotes = Array.isArray(data.quotes) ? data.quotes : [];

      // Normalizar ambos tipos para mostrar en la misma tabla
      const ventasUnificadas = [
        ...orders.map(o => ({
          id: o.id,
          order_number: o.order_number || o.order || "--",
          fecha: o.fecha || o.created_at?.slice(0,10) || "--",
          cliente: o.user?.name || o.user_id || "--",
          total: o.total,
          status: o.status,
          tipo: "order"
        })),
        ...quotes.map(q => ({
          id: `Q${q.id}`,
          order_number: q.codigo || "--",
          fecha: q.fecha || q.created_at?.slice(0,10) || "--",
          cliente: q.user?.name || q.user_id || "--",
          total: q.estimated_price, // <-- CAMBIO AQUÍ
          status: q.status,
          tipo: "quote"
        }))
      ];

      setVentas(ventasUnificadas);
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
    const estado = (v.status || "").toLowerCase();
    const estadosValidos = [
      "paid", "processing", "shipped", "delivered",
      "pagado", "en_produccion", "listo_para_entregar", "entregado"
    ];
    const esVentaValida = estadosValidos.includes(estado);
    const matchCliente = clienteFilter
      ? (v.cliente || "").toLowerCase().includes(clienteFilter.toLowerCase())
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
                    <td>{v.order_number}</td>
                    <td>{v.fecha}</td>
                    <td>{v.cliente}</td>
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