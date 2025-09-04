import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from "../Service/AuthService";
import '../Styles/store.css';

import sunsetImg from '../sources/store/Sunset.png';
import bbImg from '../sources/store/bb.png';
import astroImg from '../sources/store/Astro.png';

const Store = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.getPredefinedProducts()
      .then(data => {
        setProductos(Array.isArray(data) ? data : []);
        setError("");
      })
      .catch(() => setError("No se pudieron cargar los productos."))
      .finally(() => setLoading(false));
  }, []);

  const handleClick = async (id) => {
    const logged = await AuthService.isLoggedIn();
    if (!logged) {
      setShowPopup(true);
      return;
    }
    navigate(`/producto/${id}`);
  };

  const getImageForProduct = (name) => {
    if (!name) return "";
    const lower = name.toLowerCase();
    if (lower.includes('sunset')) return sunsetImg;
    if (lower.includes('bb')) return bbImg;
    if (lower.includes('astro')) return astroImg;
    return "";
  };

  const handlePopupAccept = () => {
    setShowPopup(false);
    navigate("/login");
  };

  return (
    <div className="catalog-page">
      <h1 className="catalog-title">NUESTRAS ONDAS</h1>
      {loading ? (
        <div>Cargando productos...</div>
      ) : error ? (
        <div style={{ color: "red" }}>{error}</div>
      ) : (
        <div className="product-container">
          {productos.map(prod => (
            <div
              className="product-item"
              key={prod.id}
              onClick={() => handleClick(prod.id)}
              style={{ cursor: "pointer" }}
            >
              <img
                className="product-image"
                src={getImageForProduct(prod.name)}
                alt={prod.name}
              />
              <div className="product-name">{prod.name}</div>
              <div className="product-price">${prod.final_price}</div>
            </div>
          ))}
        </div>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-modal">
            <h2>¡Atención!</h2>
            <p>Para continuar debe estar logueado.</p>
            <button className="popup-btn" onClick={handlePopupAccept}>
              Aceptar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Store;
