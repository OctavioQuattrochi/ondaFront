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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      
      const user = JSON.parse(localStorage.getItem("user")) || {};
      const payload = {
        name: user.name || "",
        email: user.email || "",
        lastname: user.lastname || "",
        ...form
      };
      await AuthService.updateUserProfile(payload);
      localStorage.setItem("user", JSON.stringify({ ...user, ...form }));
      navigate('/mis-compras');
    } catch {
      setError("No se pudieron guardar los datos de envío.");
    }
  };

  return (
    <div className="address-form-container">
      <h2 className="form-title">Datos de envío</h2>
      <form className="address-form" onSubmit={handleSubmit}>
        <label htmlFor="direccion">Dirección</label>
        <input type="text" id="direccion" name="direccion" required value={form.direccion} onChange={handleChange} />

        <label htmlFor="localidad">Localidad</label>
        <input type="text" id="localidad" name="localidad" required value={form.localidad} onChange={handleChange} />

        <label htmlFor="provincia">Provincia</label>
        <select id="provincia" name="provincia" required value={form.provincia} onChange={handleChange}>
          <option value="">Seleccionar</option>
          <option value="Buenos Aires">Buenos Aires</option>
          <option value="Córdoba">Córdoba</option>
          <option value="Santa Fe">Santa Fe</option>
        </select>

        <label htmlFor="dni">DNI</label>
        <input type="text" id="dni" name="dni" required value={form.dni} onChange={handleChange} />

        <label htmlFor="telefono">Teléfono</label>
        <input type="text" id="telefono" name="telefono" required value={form.telefono} onChange={handleChange} />

        <label htmlFor="nota">Nota</label>
        <textarea
          id="nota"
          name="nota"
          placeholder="Notas especiales para tu pedido, por ejemplo, notas especiales para la entrega."
          value={form.nota}
          onChange={handleChange}
        ></textarea>

        {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}

        <button type="submit" className="submit-button">
          Confirmar
        </button>
      </form>
    </div>
  );
}
