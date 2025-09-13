import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from "../../Service/AuthService";
import "../../Styles/Login/AddressForm.css";

export default function AddressForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    direccion: "",
    localidad: "",
    provincia: "",
    dni: "",
    telefono: "",
    nota: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user")) || {};
      const payload = {
        name: user.name || "",
        email: user.email || "",
        lastname: user.lastname || "",
        detail: {
          address: form.direccion,
          city: form.localidad,
          province: form.provincia,
          phone: form.telefono,
          dni: form.dni,
          note: form.nota,
        }
      };
      await AuthService.updateUserProfile(payload);
      localStorage.setItem("user", JSON.stringify({ ...user, detail: payload.detail }));
      navigate('/');
    } catch {
      setError("No se pudieron guardar los datos de envío.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="address-form-container">
      <h2 className="form-title">Datos de envío</h2>
      <form className="address-form" onSubmit={handleSubmit}>
        <label htmlFor="direccion">Dirección</label>
        <input type="text" id="direccion" name="direccion" required value={form.direccion} onChange={handleChange} disabled={loading} />

        <label htmlFor="localidad">Localidad</label>
        <input type="text" id="localidad" name="localidad" required value={form.localidad} onChange={handleChange} disabled={loading} />

        <label htmlFor="provincia">Provincia</label>
        <select id="provincia" name="provincia" required value={form.provincia} onChange={handleChange} disabled={loading}>
          <option value="">Seleccionar</option>
          <option value="Buenos Aires">Buenos Aires</option>
          <option value="Córdoba">Córdoba</option>
          <option value="Santa Fe">Santa Fe</option>
        </select>

        <label htmlFor="dni">DNI</label>
        <input type="text" id="dni" name="dni" required value={form.dni} onChange={handleChange} disabled={loading} />

        <label htmlFor="telefono">Teléfono</label>
        <input type="text" id="telefono" name="telefono" required value={form.telefono} onChange={handleChange} disabled={loading} />

        <label htmlFor="nota">Nota</label>
        <textarea
          id="nota"
          name="nota"
          placeholder="Notas especiales para tu pedido, por ejemplo, notas especiales para la entrega."
          value={form.nota}
          onChange={handleChange}
          disabled={loading}
        ></textarea>

        {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
        {loading && <div className="addressform-loading">Guardando datos...</div>}

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Guardando..." : "Confirmar"}
        </button>
      </form>
    </div>
  );
}
