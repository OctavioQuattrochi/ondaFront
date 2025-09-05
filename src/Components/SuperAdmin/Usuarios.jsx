import React, { useEffect, useState } from "react";
import Sidebar from "../Shared/Sidebar";
import AuthService from "../../Service/AuthService";
import "../../Styles/users.css";
import Paginator from "../Paginator";

const ROLES = ["superadmin", "admin", "empleado", "usuario"];

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState({ role: "", name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const fetchUsuarios = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await AuthService.getUsers(filtro);
      setUsuarios(Array.isArray(data) ? data : (data.data || []));
    } catch {
      setError("No se pudieron cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsuarios();
    // eslint-disable-next-line
  }, [filtro]);

  useEffect(() => {
    setPage(1);
  }, [filtro]);

  const handleRoleChange = async (id, newRole) => {
    try {
      await AuthService.updateUserRole(id, newRole);
      fetchUsuarios();
    } catch {
      alert("No se pudo actualizar el rol.");
    }
  };

  const paginatedUsuarios = usuarios.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="presupuestos-container">
        <h2 className="titulo">Usuarios</h2>
        <div style={{ marginBottom: 16, display: "flex", gap: 12 }}>
          <input
            type="text"
            placeholder="Nombre"
            value={filtro.name}
            onChange={e => setFiltro({ ...filtro, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Email"
            value={filtro.email}
            onChange={e => setFiltro({ ...filtro, email: e.target.value })}
          />
          <select
            value={filtro.role}
            onChange={e => setFiltro({ ...filtro, role: e.target.value })}
          >
            <option value="">Todos los roles</option>
            {ROLES.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <button onClick={fetchUsuarios}>Buscar</button>
        </div>
        <div className="tabla-container">
          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Cambiar rol</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5}>Cargando...</td></tr>
              ) : error ? (
                <tr><td colSpan={5} style={{ color: "red" }}>{error}</td></tr>
              ) : paginatedUsuarios.length === 0 ? (
                <tr><td colSpan={5}>No hay usuarios para mostrar.</td></tr>
              ) : (
                paginatedUsuarios.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      <select
                        value={u.role}
                        onChange={e => handleRoleChange(u.id, e.target.value)}
                        disabled={u.role === "superadmin"}
                      >
                        {ROLES.map(r => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Paginator
          currentPage={page}
          totalCount={usuarios.length}
          pageSize={pageSize}
          onPageChange={p => setPage(p)}
        />
      </div>
    </div>
  );
}