import React, { useRef, useState } from 'react';
import '../Styles/customs.css';
import AuthService from "../Service/AuthService";

const Customs = () => {
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const imageRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handlePresupuestar = async (e) => {
    e.preventDefault();
    setMensaje("");
    setLoading(true);

    const image = imageRef.current.files[0];
    const height = e.target.height.value;
    const width = e.target.width.value;
    const color = e.target.color.value;
    const quantity = e.target.quantity.value;
    const note = e.target.note.value;

    if (!image) {
      setMensaje("Debes subir una imagen.");
      setLoading(false);
      return;
    }

    try {
      const response = await AuthService.analyzeCustom({
        image,
        height,
        width,
        color,
        quantity,
        note
      });
      const price = response.estimated_price;
      if (price && !isNaN(Number(price))) {
        setMensaje(
          <>
            <span style={{ color: "#7b5bff", fontWeight: "bold" }}>
              Presupuesto realizado con éxito
            </span>
            <br />
            <span>
              Puede consultar el estado de su presupuesto desde <b>Mis Presupuestos</b>.
            </span>
            <br />
            <span style={{ fontWeight: "bold" }}>
              Presupuesto estimado: ${Number(price).toLocaleString('es-AR')}
            </span>
          </>
        );
      } else {
        setMensaje("No se pudo calcular el presupuesto.");
      }
    } catch (err) {
      setMensaje("No se pudo generar el presupuesto.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormReset = () => {
    setPreview(null);
    setMensaje("");
    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  return (
    <div className="budget-page">
      <div className="header-container">
        <h1 className="budget-title">PRESUPUESTO</h1>
      </div>
      <form
        className="content-container"
        onSubmit={handlePresupuestar}
        onReset={handleFormReset}
        autoComplete="off"
      >
        <div className="left-container" style={{ border: "2px solid #7b5bff", background: "#181818", justifyContent: preview ? "flex-start" : "center" }}>
          <label htmlFor="imageUpload" className="upload-label" style={{ display: preview ? "none" : "flex" }}>
            <div className="upload-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="48"
                width="48"
                viewBox="0 0 48 48"
                fill="#888"
              >
                <path d="M22.5 31.5h3v-9.85l3.65 3.6 2.1-2.1-7.3-7.3-7.3 7.3 2.1 2.1 3.65-3.6ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h30q1.2 0 2.1.9.9.9.9 2.1v30q0 1.2-.9 2.1-.9.9-2.1.9Z" />
              </svg>
            </div>
          </label>
          <input
            type="file"
            id="imageUpload"
            className="image-input"
            ref={imageRef}
            name="image"
            onChange={handleImageChange}
            accept="image/*"
          />
          {preview && (
            <div className="image-preview" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img
                src={preview}
                alt="Vista previa"
                style={{
                  maxWidth: "90%",
                  maxHeight: "90%",
                  borderRadius: "12px",
                  boxShadow: "0 2px 12px #000a",
                  objectFit: "contain",
                  background: "#222"
                }}
              />
            </div>
          )}
        </div>

        <div className="right-container">
          <h2 className="subtitle">Personaliza el tuyo</h2>

          <div className="input-group">
            <label>Tamaño</label>
            <div className="input-row">
              <div className="input-size">
                <span className="input-label">Alto</span>
                <input
                  type="number"
                  id="height"
                  name="height"
                  className="numeric-input"
                  min="1"
                  defaultValue="50"
                  required
                />
                <span className="unit">cm</span>
              </div>
              <div className="input-size">
                <span className="input-label">Ancho</span>
                <input
                  type="number"
                  id="width"
                  name="width"
                  className="numeric-input"
                  min="1"
                  defaultValue="80"
                  required
                />
                <span className="unit">cm</span>
              </div>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="color">Color</label>
            <select id="color" name="color" className="color-select" required>
              <option value="warm-white">Blanco cálido</option>
              <option value="cool-white">Blanco frío</option>
              <option value="yellow">Amarillo</option>
              <option value="red">Rojo</option>
              <option value="blue">Azul</option>
              <option value="green">Verde</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="quantity">Cantidad</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="numeric-input"
              min="1"
              defaultValue="1"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="note">Nota</label>
            <textarea
              id="note"
              name="note"
              className="note-textarea"
              placeholder="Especificaciones. Ej: si es más de un color"
              rows="4"
            />
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button className="budget-button" type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Presupuestar"}
            </button>
            <button className="budget-button" type="reset" disabled={loading} style={{ background: "#ccc", color: "#333" }}>
              Limpiar
            </button>
          </div>
          {mensaje && <div className="mensaje-presupuesto">{mensaje}</div>}
        </div>
      </form>
    </div>
  );
};

export default Customs;
