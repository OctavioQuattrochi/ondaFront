import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthService from "../../Service/AuthService";
import "../../Styles/Login/profile.css";

export default function Profile() {
  const navigate = useNavigate();
  const { setIsLogged } = useAuth();

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    province: "",
    phone: "",
    dni: "",
    note: "",
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setForm({
        name: user.name || "",
        email: user.email || "",
        address: "",
        city: "",
        province: "",
        phone: "",
        dni: "",
        note: "",
      });
    }
    // eslint-disable-next-line
  }, []);

  // Trae los datos completos solo al editar
  const fetchUserDetails = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await AuthService.getUserById(user.id);
      const details = data.detail || {};
      setForm({
        name: data.name || "",
        email: data.email || "",
        address: details.address || "",
        city: details.city || "",
        province: details.province || "",
        phone: details.phone || "",
        dni: details.dni || "",
        note: details.note || "",
      });
    } catch {
      setError("No se pudieron cargar los datos del usuario.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AuthService.logout();
    setIsLogged(false);
    navigate("/login");
  };

  const handleEdit = async () => {
    setEditing(true);
    setMsg("");
    setError("");
    await fetchUserDetails();
  };

  const handleCancel = () => {
    setEditing(false);
    setMsg("");
    setError("");
    setForm({
      name: user.name || "",
      email: user.email || "",
      address: "",
      city: "",
      province: "",
      phone: "",
      dni: "",
      note: "",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        detail: {
          address: form.address,
          city: form.city,
          province: form.province,
          phone: form.phone,
          dni: form.dni,
          note: form.note,
        }
      };
      const updated = await AuthService.updateUserProfile(payload);
      setEditing(false);
      setMsg("Datos actualizados correctamente.");
      localStorage.setItem("user", JSON.stringify({
        ...user,
        name: updated.name || user.name,
        email: updated.email || user.email,
      }));
      setForm({
        name: updated.name || user.name,
        email: updated.email || user.email,
        address: "",
        city: "",
        province: "",
        phone: "",
        dni: "",
        note: "",
      });
    } catch {
      setError("No se pudo actualizar el perfil.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
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
              {form.name || form.email || "Sin datos"}
            </div>
            <b>Email:</b>
            <div className="profile-value">{form.email}</div>
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
        loading ? (
          <div className="profile-loading">Cargando datos...</div>
        ) : (
          <form onSubmit={handleSave} className="profile-form">
            <div>
              <label>Nombre</label>
              <input name="name" value={form.name} onChange={handleChange} disabled />
            </div>
            <div>
              <label>Email</label>
              <input name="email" value={form.email} onChange={handleChange} disabled />
            </div>
            <div>
              <label>Dirección</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Localidad</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Provincia</label>
              <input
                name="province"
                value={form.province}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Teléfono</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>DNI</label>
              <input name="dni" value={form.dni} onChange={handleChange} />
            </div>
            <div>
              <label>Nota</label>
              <textarea name="note" value={form.note || ""} onChange={handleChange} />
            </div>
            <div className="profile-form-btns">
              <button type="submit" className="profile-btn save" disabled={loading}>
                Guardar
              </button>
              <button
                type="button"
                className="profile-btn cancel"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
            {msg && <div className="profile-msg success">{msg}</div>}
            {error && <div className="profile-msg error">{error}</div>}
          </form>
        )
      )}
    </div>
  );
}