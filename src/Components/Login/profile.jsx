import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthService from "../../Service/AuthService";
import "../../Styles/Login/profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const { setIsLogged } = useAuth();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    return {
      name: user.name || "",
      email: user.email || "",
      direccion: user.direccion || "",
      localidad: user.localidad || "",
      provincia: user.provincia || "",
      telefono: user.telefono || "",
      dni: user.dni || "",
    };
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    await AuthService.logout();
    setIsLogged(false);
    navigate("/login");
  };

  const handleEdit = () => {
    setEditing(true);
    setMsg("");
    setError("");
  };

  const handleCancel = () => {
    setEditing(false);
    setMsg("");
    setError("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    try {
      // Debes implementar este método en AuthService
      const updated = await AuthService.updateUserProfile(form);
      // Actualiza localStorage y el form
      localStorage.setItem("user", JSON.stringify({ ...user, ...updated }));
      setEditing(false);
      setMsg("Datos actualizados correctamente.");
    } catch {
      setError("No se pudo actualizar el perfil.");
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="profile-container">
      <h2>Mi perfil</h2>
      {!editing ? (
        <>
          <div className="profile-data">
            <b>Usuario:</b>
            <div className="profile-value">
              {user?.name || user?.email || "Sin datos"}
            </div>
            <b>Email:</b>
            <div className="profile-value">{user?.email}</div>
            {user.direccion && (
              <>
                <b>Dirección:</b>
                <div className="profile-value">{user.direccion}</div>
                <b>Localidad:</b>
                <div className="profile-value">{user.localidad}</div>
                <b>Provincia:</b>
                <div className="profile-value">{user.provincia}</div>
                <b>Teléfono:</b>
                <div className="profile-value">{user.telefono}</div>
                <b>DNI:</b>
                <div className="profile-value">{user.dni}</div>
              </>
            )}
          </div>
          <button onClick={handleEdit} className="profile-btn edit">
            Editar datos personales
          </button>
          <button onClick={handleLogout} className="profile-btn logout">
            Cerrar sesión
          </button>
          {msg && <div className="profile-msg success">{msg}</div>}
          {error && <div className="profile-msg error">{error}</div>}
        </>
      ) : (
        <form onSubmit={handleSave} className="profile-form">
          <div>
            <label>Nombre</label>
            <input name="name" value={form.name} onChange={handleChange} />
          </div>
          <div>
            <label>Email</label>
            <input name="email" value={form.email} onChange={handleChange} />
          </div>
          <div>
            <label>Dirección</label>
            <input
              name="direccion"
              value={form.direccion}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Localidad</label>
            <input
              name="localidad"
              value={form.localidad}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Provincia</label>
            <input
              name="provincia"
              value={form.provincia}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Teléfono</label>
            <input
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>DNI</label>
            <input name="dni" value={form.dni} onChange={handleChange} />
          </div>
          <div className="profile-form-btns">
            <button type="submit" className="profile-btn save">
              Guardar
            </button>
            <button
              type="button"
              className="profile-btn cancel"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
          {msg && <div className="profile-msg success">{msg}</div>}
          {error && <div className="profile-msg error">{error}</div>}
        </form>
      )}
    </div>
  );
}