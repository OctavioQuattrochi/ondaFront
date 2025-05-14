import React from 'react';
import '../Styles/AddressForm.css';

export default function AddressForm() {
  return (
    <div className="address-form-container">
      <h2 className="form-title">Datos de envío</h2>
      <form className="address-form">
        <label htmlFor="direccion">Dirección</label>
        <input type="text" id="direccion" name="direccion" required />

        <label htmlFor="localidad">Localidad</label>
        <input type="text" id="localidad" name="localidad" required />

        <label htmlFor="provincia">Provincia</label>
        <select id="provincia" name="provincia" required>
          <option value="">Seleccionar</option>
          <option value="Buenos Aires">Buenos Aires</option>
          <option value="Córdoba">Córdoba</option>
          <option value="Santa Fe">Santa Fe</option>
          {/* Agregá más provincias si querés */}
        </select>

        <label htmlFor="dni">DNI</label>
        <input type="text" id="dni" name="dni" required />

        <label htmlFor="telefono">Teléfono</label>
        <input type="text" id="telefono" name="telefono" required />

        <label htmlFor="nota">Nota</label>
        <textarea
          id="nota"
          name="nota"
          placeholder="Notas especiales para tu pedido, por ejemplo, notas especiales para la entrega."
        ></textarea>

        <button type="submit" className="submit-button">
          Confirmar
        </button>
      </form>
    </div>
  );
}
