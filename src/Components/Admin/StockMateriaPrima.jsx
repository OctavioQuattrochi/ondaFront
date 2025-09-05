import React, { useEffect, useState } from 'react';
import Sidebar from '../Shared/Sidebar';
import '../../Styles/Admin/StockMateriaPrima.css';
import AuthService from "../../Service/AuthService";
import Paginator from "../Paginator";

const StockMateriaPrima = () => {
  const [materials, setMaterials] = useState([]);
  const [error, setError] = useState("");
  const [materialFilter, setMaterialFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    AuthService.getRawMaterials()
      .then(data => {
        const mats = Array.isArray(data) ? data : (Array.isArray(data.data) ? data.data : []);
        setMaterials(mats);
        const uniqueLocations = Array.from(new Set(mats.map(mat => mat.location || mat.supplier).filter(Boolean)));
        setLocations(uniqueLocations);
      })
      .catch(() => setError("No se pudieron cargar las materias primas."));
  }, []);

  const filteredMaterials = materials.filter(mat => {
    const matchMaterial = (mat.material || "").toLowerCase().includes(materialFilter.toLowerCase());
    const matchLocation = locationFilter ? (mat.location === locationFilter || mat.supplier === locationFilter) : true;
    return matchMaterial && matchLocation;
  });

  const paginatedMaterials = filteredMaterials.slice((page - 1) * pageSize, page * pageSize);

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
              onChange={e => {
                setMaterialFilter(e.target.value);
                setPage(1);
              }}
              placeholder="Buscar material..."
              autoComplete="off"
            />
          </div>
          <div className="campo">
            <label htmlFor="location-select">Ubicación / Proveedor</label>
            <select
              id="location-select"
              value={locationFilter}
              onChange={e => {
                setLocationFilter(e.target.value);
                setPage(1);
              }}
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
              <th>Ubicación / Proveedor</th>
            </tr>
          </thead>
          <tbody>
            {error && (
              <tr>
                <td colSpan={6} style={{ color: "red" }}>{error}</td>
              </tr>
            )}
            {paginatedMaterials.length === 0 && !error && (
              <tr>
                <td colSpan={6}>No hay materias primas registradas.</td>
              </tr>
            )}
            {paginatedMaterials.map((mat) => (
              <tr key={mat.id}>
                <td>{mat.material || "--"}</td>
                <td>{mat.description || "--"}</td>
                <td>{mat.status || "--"}</td>
                <td>{mat.quantity}</td>
                <td>{mat.unit || "--"}</td>
                <td>{mat.location || mat.supplier || "--"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Paginator
          totalItems={filteredMaterials.length}
          pageSize={pageSize}
          currentPage={page}
          onPageChange={newPage => setPage(newPage)}
        />
      </div>
    </div>
  );
};

export default StockMateriaPrima;
