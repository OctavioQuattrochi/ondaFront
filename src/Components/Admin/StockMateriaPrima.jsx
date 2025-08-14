import React, { useEffect, useState } from 'react';
import Sidebar from '../Shared/Sidebar';
import '../../Styles/Admin/StockMateriaPrima.css';
import AuthService from "../../Service/AuthService";

const StockMateriaPrima = () => {
  const [materials, setMaterials] = useState([]);
  const [error, setError] = useState("");
  const [materialFilter, setMaterialFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    AuthService.getRawMaterials()
      .then(data => {
        setMaterials(data);
        // Extraer ubicaciones únicas para el select
        const uniqueLocations = Array.from(new Set(data.map(mat => mat.location).filter(Boolean)));
        setLocations(uniqueLocations);
      })
      .catch(() => setError("No se pudieron cargar las materias primas."));
  }, []);

  // Filtrado por nombre de material y ubicación
  const filteredMaterials = materials.filter(mat => {
    const matchMaterial = mat.name?.toLowerCase().includes(materialFilter.toLowerCase());
    const matchLocation = locationFilter ? mat.location === locationFilter : true;
    return matchMaterial && matchLocation;
  });

  return (
    <div className="stock-layout">
      <Sidebar />
      <div className="stock-container">
        <h1 className="stock-titulo">Stock de materia prima</h1>

        <div className="filtros">
          <div className="campo">
            <label htmlFor="material-input">Material</label>
            <input
              id="material-input"
              type="text"
              value={materialFilter}
              onChange={e => setMaterialFilter(e.target.value)}
              placeholder="Buscar material..."
              autoComplete="off"
            />
          </div>
          <div className="campo">
            <label htmlFor="location-select">Ubicación</label>
            <select
              id="location-select"
              value={locationFilter}
              onChange={e => setLocationFilter(e.target.value)}
            >
              <option value="">Todas</option>
              {locations.map((loc, idx) => (
                <option key={idx} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        <table className="tabla-stock">
          <thead>
            <tr>
              <th>Material</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th>Cantidad</th>
              <th>Tipo de medida</th>
              <th>Ubicación</th>
            </tr>
          </thead>
          <tbody>
            {error && (
              <tr>
                <td colSpan={6} style={{ color: "red" }}>{error}</td>
              </tr>
            )}
            {filteredMaterials.length === 0 && !error && (
              <tr>
                <td colSpan={6}>No hay materias primas registradas.</td>
              </tr>
            )}
            {filteredMaterials.map((mat) => (
              <tr key={mat.id}>
                <td>{mat.name}</td>
                <td>{mat.description || "--"}</td>
                <td>{mat.status || "--"}</td>
                <td>{mat.quantity}</td>
                <td>{mat.unit || "--"}</td>
                <td>{mat.location || "--"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockMateriaPrima;
