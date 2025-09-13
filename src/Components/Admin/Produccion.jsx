import React, { useEffect, useState } from 'react';
import Sidebar from '../Shared/Sidebar';
import '../../Styles/Admin/Produccion.css';
import AuthService from "../../Service/AuthService";
import Paginator from "../Paginator";

const ESTADOS = ["Pendiente", "En produccion", "Finalizado"];
const ESTADOS_PERSONALIZADO = [
  { value: "pendiente", label: "Pendiente de revisión" },
  { value: "esperando_confirmacion", label: "Esperando confirmación del cliente" },
  { value: "pendiente_pago", label: "Pendiente de pago" },
  { value: "pagado", label: "Pagado" },
  { value: "en_produccion", label: "En producción" },
  { value: "listo_para_entregar", label: "Listo para entregar" },
  { value: "entregado", label: "Entregado" },
  { value: "cancelado", label: "Cancelado" }
];

const EMPLEADO_ESTADOS = [
  "en_produccion",
  "listo_para_entregar",
  "entregado",
  "cancelado"
];

const Produccion = () => {
  const [lotes, setLotes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [personalizados, setPersonalizados] = useState([]);
  const [estadoFilter, setEstadoFilter] = useState("");
  const [productoFilter, setProductoFilter] = useState("");
  const [error, setError] = useState("");
  const [selectedLote, setSelectedLote] = useState(null);

  // Estados para agregar lote
  const [nuevoProductoId, setNuevoProductoId] = useState("");
  const [nuevoColor, setNuevoColor] = useState("");
  const [nuevaCantidad, setNuevaCantidad] = useState(1);
  const [nuevoEstado, setNuevoEstado] = useState(ESTADOS[0]);
  const [nuevoPrecio, setNuevoPrecio] = useState("");
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserRole(user?.role || "");
  }, []);

  useEffect(() => {
    AuthService.getPredefinedProducts()
      .then(data => setProductos(data))
      .catch(() => setError("No se pudieron cargar los productos de la tienda."));
  }, []);

  const cargarLotes = () => {
    setLoading(true);
    AuthService.getProductionBatches()
      .then(data => setLotes(data))
      .catch(() => setError("No se pudieron cargar los lotes de producción."))
      .finally(() => setLoading(false));
  };

  const cargarPersonalizados = () => {
    AuthService.getAllQuotes()
      .then(data => {
        const pagados = (Array.isArray(data) ? data : []).filter(
          p => ["pagado", "en_produccion"].includes(p.status)
        );
        setPersonalizados(pagados);
      })
      .catch(() => setError("No se pudieron cargar los personalizados."));
  };

  useEffect(() => {
    cargarLotes();
    cargarPersonalizados();
  }, []);

  const filteredLotes = lotes.filter(lote => {
    const matchEstado = estadoFilter ? lote.status === estadoFilter : true;
    const prod = productos.find(p => p.id === lote.product_id);
    const matchProducto = productoFilter
      ? (prod?.name || "").toLowerCase().includes(productoFilter.toLowerCase())
      : true;
    return matchEstado && matchProducto;
  });

  const filteredPersonalizados = personalizados.filter(p => {
    const matchEstado = estadoFilter ? (p.status === estadoFilter || p.status === "en_produccion") : true;
    const matchProducto = productoFilter
      ? (p.product_name || p.detalle || "").toLowerCase().includes(productoFilter.toLowerCase())
      : true;
    return matchEstado && matchProducto;
  });

  const paginatedLotes = filteredLotes.slice((page - 1) * pageSize, page * pageSize);
  const paginatedPersonalizados = filteredPersonalizados.slice((page - 1) * pageSize, page * pageSize);

  const handleAgregar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const productoOriginal = productos.find(p => p.id === nuevoProductoId);
      const priceValue = nuevoPrecio !== "" && !isNaN(nuevoPrecio)
        ? parseFloat(nuevoPrecio)
        : productoOriginal?.final_price ?? 0;

      const data = {
        product_id: nuevoProductoId,
        color: nuevoColor,
        quantity: nuevaCantidad,
        status: nuevoEstado,
        price: priceValue
      };
      await AuthService.createProductionBatch(data);
      cargarLotes();
      setNuevoProductoId("");
      setNuevoColor("");
      setNuevaCantidad(1);
      setNuevoEstado(ESTADOS[0]);
      setNuevoPrecio("");
    } catch (err) {
      setError("No se pudo crear el lote.");
    } finally {
      setLoading(false);
    }
  };

  // Handler para actualizar lote (cambiar estado o cantidad)
  const handleActualizar = async (lote) => {
    setLoading(true);
    setError("");
    try {
      await AuthService.updateProductionBatch(lote.id, {
        status: lote.status,
        quantity: lote.quantity
      });
      cargarLotes();
      setSelectedLote(null);
    } catch {
      setError("No se pudo actualizar el lote.");
    } finally {
      setLoading(false);
    }
  };

  // Handler para actualizar personalizado (cambiar estado)
  const handleActualizarPersonalizado = async (presupuesto) => {
    setLoading(true);
    setError("");
    try {
      await AuthService.updateQuote(presupuesto.id, {
        status: presupuesto.status
      });
      cargarPersonalizados();
      setSelectedLote(null);
    } catch {
      setError("No se pudo actualizar el personalizado.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [estadoFilter, productoFilter]);

  return (
    <div className="produccion-layout">
      <Sidebar />
      <div className="produccion-container">
        <h1 className="produccion-titulo">Producción</h1>

        <div className="filtros-produccion">
          <div className="filtro-estado">
            <label htmlFor="estado">Estado:</label>
            <select
              id="estado"
              value={estadoFilter}
              onChange={e => setEstadoFilter(e.target.value)}
            >
              <option value="">Todos</option>
              {ESTADOS.map((estado, idx) => (
                <option key={idx} value={estado}>{estado}</option>
              ))}
            </select>
          </div>
          <div className="filtro-producto">
            <label htmlFor="producto-input">Producto:</label>
            <input
              id="producto-input"
              type="text"
              value={productoFilter}
              onChange={e => setProductoFilter(e.target.value)}
              placeholder="Buscar producto..."
              autoComplete="off"
            />
          </div>
        </div>

        <div className="tabla-wrapper">
          <table className="tabla-produccion">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Color/Detalle</th>
                <th>Notas</th>
                <th>Estado</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Fecha estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", color: "#a95ff7", fontWeight: "bold" }}>
                    Cargando producción...
                  </td>
                </tr>
              ) : (
                <>
                  {error && (
                    <tr>
                      <td colSpan={8} style={{ color: "red" }}>{error}</td>
                    </tr>
                  )}
                  {paginatedLotes.length === 0 && paginatedPersonalizados.length === 0 && !error && (
                    <tr>
                      <td colSpan={8}>No hay registros.</td>
                    </tr>
                  )}
                  {/* Lotes de producción */}
                  {paginatedLotes.map((lote, idx) => {
                    const prod = productos.find(p => p.id === lote.product_id);
                    const isEditing = selectedLote?.id === lote.id && selectedLote?.tipo === "Producto";
                    return (
                      <tr
                        key={`lote-${lote.id || idx}`}
                        className={isEditing ? "tr-edicion" : ""}
                      >
                        {/* Producto */}
                        <td>{prod?.name || "--"}</td>
                        {/* Color */}
                        <td>{lote.color || "--"}</td>
                        {/* Notas */}
                        <td>--</td>
                        {/* Estado */}
                        <td>
                          {isEditing ? (
                            <select
                              value={selectedLote.status}
                              onChange={e =>
                                setSelectedLote({ ...selectedLote, status: e.target.value, tipo: "Producto" })
                              }
                            >
                              {ESTADOS.map((estado, i) => (
                                <option key={i} value={estado}>{estado}</option>
                              ))}
                            </select>
                          ) : (
                            lote.status
                          )}
                        </td>
                        {/* Cantidad */}
                        <td>
                          {isEditing ? (
                            <input
                              type="number"
                              min={1}
                              value={selectedLote.quantity}
                              onChange={e =>
                                setSelectedLote({ ...selectedLote, quantity: Number(e.target.value), tipo: "Producto" })
                              }
                            />
                          ) : (
                            lote.quantity
                          )}
                        </td>
                        {/* Precio */}
                        <td>
                          {lote.price !== undefined
                            ? `$${parseFloat(lote.price).toLocaleString()}`
                            : prod?.final_price
                              ? `$${parseFloat(prod.final_price).toLocaleString()}`
                              : "--"
                          }
                        </td>
                        {/* Fecha estado */}
                        <td>{lote.updated_at ? new Date(lote.updated_at).toLocaleDateString() : "--"}</td>
                        {/* Acciones */}
                        <td>
                          {isEditing ? (
                            <>
                              <button
                                className="btn aceptar"
                                onClick={() => handleActualizar(selectedLote)}
                                disabled={loading}
                              >
                                Guardar
                              </button>
                              <button
                                className="btn cancelar"
                                onClick={() => setSelectedLote(null)}
                                disabled={loading}
                              >
                                Cancelar
                              </button>
                            </>
                          ) : (
                            <button
                              className="btn editar"
                              onClick={() => setSelectedLote({ ...lote, tipo: "Producto" })}
                            >
                              Editar
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {/* Personalizados (presupuestos pagados/en produccion) */}
                  {paginatedPersonalizados.map((p, idx) => {
                    const isEditing = selectedLote?.id === p.id && selectedLote?.tipo === "Personalizado";
                    // Truncar nota si es muy larga
                    const notaCorta = p.note
                      ? p.note.length > 40
                        ? p.note.slice(0, 40) + "..."
                        : p.note
                      : "--";
                      
                    let estadoOptions = ESTADOS_PERSONALIZADO;
                    if (userRole === "empleado" && p.status === "pagado") {
                      estadoOptions = ESTADOS_PERSONALIZADO.filter(e =>
                        EMPLEADO_ESTADOS.includes(e.value) || e.value === p.status
                      );
                      if (!EMPLEADO_ESTADOS.includes(p.status)) {
                        estadoOptions = [
                          ESTADOS_PERSONALIZADO.find(e => e.value === p.status),
                          ...ESTADOS_PERSONALIZADO.filter(e => EMPLEADO_ESTADOS.includes(e.value))
                        ].filter(Boolean);
                      }
                    }
                    return (
                      <tr
                        key={`perso-${p.id || idx}`}
                        className={isEditing ? "tr-edicion" : ""}
                      >
                        {/* Producto */}
                        <td>Personalizado</td>
                        {/* Color */}
                        <td>{p.color || "--"}</td>
                        {/* Notas */}
                        <td title={p.note || ""}>{notaCorta}</td>
                        {/* Estado */}
                        <td>
                          {isEditing ? (
                            <select
                              value={selectedLote.status}
                              onChange={e =>
                                setSelectedLote({ ...selectedLote, status: e.target.value, tipo: "Personalizado" })
                              }
                              disabled={
                                userRole === "empleado" &&
                                !["pagado", ...EMPLEADO_ESTADOS].includes(p.status)
                              }
                            >
                              {userRole === "empleado" && ["pagado", ...EMPLEADO_ESTADOS].includes(p.status)
                                ? ESTADOS_PERSONALIZADO.filter(e =>
                                    EMPLEADO_ESTADOS.includes(e.value)
                                  ).map(e => (
                                    <option key={e.value} value={e.value}>{e.label}</option>
                                  ))
                                : ESTADOS_PERSONALIZADO.map(e => (
                                    <option key={e.value} value={e.value}>{e.label}</option>
                                  ))
                              }
                            </select>
                          ) : (
                            ESTADOS_PERSONALIZADO.find(e => e.value === p.status)?.label || p.status
                          )}
                          {isEditing && userRole === "empleado" && !["pagado", ...EMPLEADO_ESTADOS].includes(p.status) && (
                            <span style={{ marginLeft: 8, color: "#a95ff7", fontSize: "0.95rem" }}>
                              (Solo editable por empleado cuando el estado es "Pagado" o posterior)
                            </span>
                          )}
                          {isEditing && userRole === "empleado" && ["pagado", ...EMPLEADO_ESTADOS].includes(p.status) && (
                            <span style={{ marginLeft: 8, color: "#a95ff7", fontSize: "0.95rem" }}>
                              (Solo puede cambiar a: En producción, Listo para entregar, Entregado o Cancelado)
                            </span>
                          )}
                        </td>
                        {/* Cantidad */}
                        <td>{p.quantity || "--"}</td>
                        {/* Precio */}
                        <td>
                          {p.price !== undefined
                            ? `$${parseFloat(p.price).toLocaleString()}`
                            : "--"
                          }
                        </td>
                        {/* Fecha estado */}
                        <td>{p.updated_at ? new Date(p.updated_at).toLocaleDateString() : "--"}</td>
                        {/* Acciones */}
                        <td>
                          {isEditing ? (
                            <>
                              <button
                                className="btn aceptar"
                                onClick={() => handleActualizarPersonalizado(selectedLote)}
                                disabled={
                                  loading ||
                                  (userRole === "empleado" &&
                                    !["pagado", ...EMPLEADO_ESTADOS].includes(selectedLote.status))
                                }
                              >
                                Guardar
                              </button>
                              <button
                                className="btn cancelar"
                                onClick={() => setSelectedLote(null)}
                                disabled={loading}
                              >
                                Cancelar
                              </button>
                            </>
                          ) : (
                            <button
                              className="btn editar"
                              onClick={() => setSelectedLote({ ...p, tipo: "Personalizado" })}
                            >
                              Editar
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Formulario para agregar lote de producción */}
        <form className="formulario-edicion" onSubmit={handleAgregar}>
          <div className="campo">
            <label>Producto:</label>
            <select
              value={nuevoProductoId}
              onChange={e => setNuevoProductoId(e.target.value)}
              required
            >
              <option value="">Seleccionar producto</option>
              {productos.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="campo">
            <label>Color:</label>
            <input
              type="text"
              value={nuevoColor}
              onChange={e => setNuevoColor(e.target.value)}
              placeholder="Ej: rojo"
            />
          </div>
          <div className="campo">
            <label>Cantidad:</label>
            <input
              type="number"
              min={1}
              value={nuevaCantidad}
              onChange={e => setNuevaCantidad(Number(e.target.value))}
              required
            />
          </div>
          <div className="campo">
            <label>Precio:</label>
            <input
              type="number"
              min={0}
              step="0.01"
              value={nuevoPrecio}
              onChange={e => setNuevoPrecio(e.target.value)}
              placeholder={
                nuevoProductoId
                  ? `Precio por defecto: $${productos.find(p => p.id === nuevoProductoId)?.final_price ?? 0}`
                  : "Ingrese precio o deje vacío"
              }
            />
          </div>
          <div className="campo">
            <label>Estado:</label>
            <select
              value={nuevoEstado}
              onChange={e => setNuevoEstado(e.target.value)}
            >
              {ESTADOS.map((estado, idx) => (
                <option key={idx} value={estado}>{estado}</option>
              ))}
            </select>
          </div>

          <div className="botones">
            <button className="btn aceptar" type="submit" disabled={loading}>
              {loading ? "Agregando..." : "Aceptar"}
            </button>
            <button
              className="btn cancelar"
              type="button"
              onClick={() => {
                setNuevoProductoId("");
                setNuevoColor("");
                setNuevaCantidad(1);
                setNuevoEstado(ESTADOS[0]);
                setNuevoPrecio("");
              }}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </form>
        <Paginator
          total={filteredLotes.length + filteredPersonalizados.length}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default Produccion;
