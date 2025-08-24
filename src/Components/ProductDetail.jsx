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
        const response = await fetch(`http://localhost:8123/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (!response.ok) throw new Error("No autorizado");
        const data = await response.json();
        setProducto(data);
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

  const handleAddToCart = async () => {
    const logged = await AuthService.isLoggedIn();
    if (!logged) {
      alert("Debes iniciar sesión para comprar.");
      navigate("/login");
      return;
    }
    try {
      await AuthService.addToCart(producto.id, 1, producto.final_price);
      alert("Producto añadido al carrito");
    } catch {
      alert("No se pudo añadir al carrito");
    }
  };

  const handleBuyNow = async () => {
    const logged = await AuthService.isLoggedIn();
    if (!logged) {
      alert("Debes iniciar sesión para comprar.");
      navigate("/login");
      return;
    }
    try {
      await AuthService.addToCart(producto.id, 1, producto.final_price);
      navigate("/checkout");
    } catch {
      alert("No se pudo procesar la compra");
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
          <div className="product-detail-price">Precio: ${producto.final_price}</div>
          <div className="product-detail-actions">
            <button className="product-detail-btn" onClick={handleAddToCart}>
              Añadir al carrito
            </button>
            <button className="product-detail-btn" onClick={handleBuyNow}>
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;