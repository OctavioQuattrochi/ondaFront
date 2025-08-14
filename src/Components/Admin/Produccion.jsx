import React, { useEffect, useState } from 'react';
import Sidebar from '../Shared/Sidebar';
import '../../Styles/Admin/Produccion.css';
import AuthService from "../../Service/AuthService";

const ESTADOS = ["Pendiente", "En producción", "Finalizado"];

const Produccion = () => {
  const [productos, setProductos] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [personalizados, setPersonalizados] = useState([]);
  const [estadoFilter, setEstadoFilter] = useState("");
  const [productoFilter, setProductoFilter] = useState("");
  const [error, setError] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);

  // Estados para agregar producto
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaCantidad, setNuevaCantidad] = useState(1);
  const [nuevoEstado, setNuevoEstado] = useState(ESTADOS[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AuthService.getProducts()
      .then(data => {
        setProductos(data.filter(p => p.type === "product"));
        setPersonalizados(data.filter(p => p.type === "personalizado"));
      })
      .catch(() => setError("No se pudieron cargar los productos."));
    AuthService.getRawMaterials()
      .then(data => setMateriales(data))
      .catch(() => setError("No se pudieron cargar las materias primas."));
  }, []);

  // Unifica todos los items en un solo array para mostrar en la tabla
  const allItems = [
    ...productos.map(p => ({ ...p, tipo: "Producto" })),
    ...materiales.map(m => ({ ...m, tipo: "Materia Prima" })),
    ...personalizados.map(p => ({ ...p, tipo: "Personalizado" })),
  ];

  // Filtrado por estado y nombre de producto
  const filteredItems = allItems.filter(item => {
    const matchEstado = estadoFilter ? (item.status || "Pendiente") === estadoFilter : true;
    const matchProducto = productoFilter
      ? (item.name || item.material || "").toLowerCase().includes(productoFilter.toLowerCase())
      : true;
    return matchEstado && matchProducto;
  });

  // Handler para agregar producto
  const handleAgregar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Ajusta los campos según tu backend
      const nuevoProducto = {
        type: "product",
        name: nuevoNombre,
        quantity: nuevaCantidad,
        status: nuevoEstado,
        color: "Sin color", // Ajusta si tienes un input para color
        location: "Sin ubicación" // Ajusta si tienes un input para ubicación
      };
      const response = await AuthService.createProduct(nuevoProducto);
      // Agrega el producto a la lista local
      setProductos(prev => [...prev, response.product]);
      // Limpia los campos
      setNuevoNombre("");
      setNuevaCantidad(1);
      setNuevoEstado(ESTADOS[0]);
    } catch (err) {
      setError("No se pudo crear el producto.");
    } finally {
      setLoading(false);
    }
  };

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
                <th>Tipo</th>
                <th>Producto / Material</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Cantidad</th>
                <th>Fecha estado</th>
                <th>Ubicación</th>
              </tr>
            </thead>
            <tbody>
              {error && (
                <tr>
                  <td colSpan={7} style={{ color: "red" }}>{error}</td>
                </tr>
              )}
              {filteredItems.length === 0 && !error && (
                <tr>
                  <td colSpan={7}>No hay registros.</td>
                </tr>
              )}
              {filteredItems.map((item, idx) => (
                <tr
                  key={item.id || idx}
                  onClick={() => setSelectedItem(item)}
                  style={{ cursor: "pointer", background: selectedItem?.id === item.id ? "#eef" : undefined }}
                >
                  <td>{item.tipo}</td>
                  <td>{item.name || item.material || "--"}</td>
                  <td>{item.description || "--"}</td>
                  <td>{item.status || "Pendiente"}</td>
                  <td>{item.quantity || "--"}</td>
                  <td>{item.updated_at ? new Date(item.updated_at).toLocaleDateString() : "--"}</td>
                  <td>{item.location || "--"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <form className="formulario-edicion" onSubmit={handleAgregar}>
          <div className="campo">
            <label>Producto:</label>
            <input
              type="text"
              value={nuevoNombre}
              onChange={e => setNuevoNombre(e.target.value)}
              required
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
                setNuevoNombre("");
                setNuevaCantidad(1);
                setNuevoEstado(ESTADOS[0]);
              }}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Produccion;
