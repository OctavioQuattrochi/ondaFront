import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AuthService from "../Service/AuthService";
import sunsetImg from '../sources/store/Sunset.png';
import bbImg from '../sources/store/bb.png';
import astroImg from '../sources/store/Astro.png';
import "../Styles/store.css";

const getImageForProduct = (name) => {
  if (!name) return "";
  const lower = name.toLowerCase();
  if (lower.includes('sunset')) return sunsetImg;
  if (lower.includes('bb')) return bbImg;
  if (lower.includes('astro')) return astroImg;
  return "";
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState("");
  const [variantes, setVariantes] = useState([]);
  const [colorSeleccionado, setColorSeleccionado] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const logged = await AuthService.isLoggedIn();
      if (!logged) {
        alert("Para continuar debe estar logueado.");
        navigate("/login");
        return;
      }
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.access_token;
      try {
        // Trae el producto actual
        const response = await fetch(`http://localhost:8123/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (!response.ok) throw new Error("No autorizado");
        const data = await response.json();
        setProducto(data);

        // Trae las variantes de este producto base
        const variantesResp = await fetch(`http://localhost:8123/api/stock`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        const allVariantes = await variantesResp.json();
        // Filtra variantes por product_id
        const variantesProducto = allVariantes.filter(
          v => v.product_id === data.id
        );
        setVariantes(variantesProducto);

        // Selecciona el color por defecto
        setColorSeleccionado(
          data.color ||
          (variantesProducto[0]?.color ?? "")
        );
      } catch {
        setError("No se pudo cargar el producto");
      }
    };
    fetchProduct();
  }, [id, navigate]);

  // Obtiene la imagen: primero intenta con el campo image del backend, si no, usa la local
  const getProductImage = () => {
    if (producto?.image) {
      return `/src/sources/store/${producto.image}`;
    }
    return getImageForProduct(producto?.name);
  };

  // Colores disponibles de las variantes
  const coloresDisponibles = variantes
    .map(v => v.color)
    .filter((c, idx, arr) => c && arr.indexOf(c) === idx);

  // Busca la variante seleccionada
  const varianteSeleccionada = variantes.find(
    v => v.color === colorSeleccionado
  );

  // Obtiene el precio: primero de la variante, si no, del producto base
  const getPrecio = () => {
    if (varianteSeleccionada?.price !== undefined && varianteSeleccionada?.price !== null) {
      return varianteSeleccionada.price;
    }
    return producto?.final_price ?? 0;
  };

  const handleAddToCart = async () => {
    const logged = await AuthService.isLoggedIn();
    if (!logged) {
      alert("Debes iniciar sesión para comprar.");
      navigate("/login");
      return;
    }
    if (!varianteSeleccionada) {
      alert("Seleccioná un color válido.");
      return;
    }
    try {
      await AuthService.addToCart(varianteSeleccionada.id, 1, getPrecio());
      navigate("/cart");
    } catch {
      alert("No se pudo añadir al carrito");
    }
  };

  if (error) return <div className="product-detail-error">{error}</div>;
  if (!producto) return <div className="product-detail-loading">Cargando...</div>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-card">
        <img
          src={getProductImage()}
          alt={producto.name}
          className="product-detail-image"
        />
        <div className="product-detail-info">
          <h2 className="product-detail-title">{producto.name}</h2>
          <p className="product-detail-description">{producto.description}</p>
          <div className="product-detail-price">
            Precio: ${getPrecio()}
          </div>
          <div style={{ margin: "1rem 0" }}>
            <label htmlFor="color" style={{ marginRight: 8 }}>Color:</label>
            <select
              id="color"
              value={colorSeleccionado}
              onChange={e => setColorSeleccionado(e.target.value)}
              style={{ padding: 4, borderRadius: 4 }}
            >
              {coloresDisponibles.length > 0 ? (
                coloresDisponibles.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))
              ) : (
                <option value={producto.color}>{producto.color}</option>
              )}
            </select>
          </div>
          <div className="product-detail-actions">
            <button className="product-detail-btn" onClick={handleAddToCart}>
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;