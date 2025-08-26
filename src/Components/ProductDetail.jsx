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
  const [productosMismoNombre, setProductosMismoNombre] = useState([]);
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

        // Trae todos los productos para buscar variantes de color
        const allResp = await fetch(`http://localhost:8123/api/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        const allProducts = await allResp.json();
        // Filtra productos con el mismo nombre (ignorando mayúsculas/minúsculas)
        const variantes = allProducts.filter(
          p => p.name && data.name && p.name.toLowerCase() === data.name.toLowerCase()
        );
        setProductosMismoNombre(variantes);

        // Si el producto actual tiene color, lo selecciona por defecto
        setColorSeleccionado(data.color || (variantes[0]?.color ?? ""));
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

  // Obtiene los colores disponibles para este producto
  const coloresDisponibles = productosMismoNombre
    .map(p => p.color)
    .filter((c, idx, arr) => c && arr.indexOf(c) === idx && c !== "Sin color");

  // Busca el producto con el color seleccionado
  const productoConColor = productosMismoNombre.find(
    p => p.color === colorSeleccionado
  ) || producto;

  const handleAddToCart = async () => {
    const logged = await AuthService.isLoggedIn();
    if (!logged) {
      alert("Debes iniciar sesión para comprar.");
      navigate("/login");
      return;
    }
    try {
      // Por defecto, agrega 1 unidad (la cantidad se ajusta en el carrito)
      await AuthService.addToCart(productoConColor.id, 1, productoConColor.final_price);
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
          alt={productoConColor.name}
          className="product-detail-image"
        />
        <div className="product-detail-info">
          <h2 className="product-detail-title">{productoConColor.name}</h2>
          <p className="product-detail-description">{productoConColor.description}</p>
          <div className="product-detail-price">Precio: ${productoConColor.final_price}</div>
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
                <option value={productoConColor.color}>{productoConColor.color}</option>
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