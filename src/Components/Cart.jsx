import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../Service/AuthService";
import "../Styles/cart.css";

// Usa la misma lógica que en la tienda para mostrar imágenes locales
const getLocalProductImage = (imageName) => {
  if (!imageName) return "";
  return `/src/sources/store/${imageName}`;
};

const Cart = () => {
  const [items, setItems] = useState([]);
  const [promo, setPromo] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [payment, setPayment] = useState("transfer");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.getCartItems()
      .then(data => {
        setItems(Array.isArray(data.items) ? data.items : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const sub = items.reduce(
      (acc, item) => acc + (parseFloat(item.product?.final_price || 0) * item.quantity),
      0
    );
    setSubtotal(sub);
    setTotal(sub);
  }, [items]);

  const handleQuantityChange = async (id, qty) => {
    if (qty < 1) return;
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: qty } : item
    ));
    await AuthService.updateCartItem(id, qty);
  };

  const handleRemove = async (id) => {
    setItems(items.filter(item => item.id !== id));
    await AuthService.removeCartItem(id);
  };

  const handleApplyPromo = () => {
    alert("Código aplicado (mock)");
  };

  const handleCheckout = async () => {
    try {
      const cartItems = items.map(item => ({
        product_id: item.product?.id,
        quantity: item.quantity
      }));
      const response = await AuthService.checkout({
        payment_method: payment,
        promo,
        items: cartItems
      });
      navigate("/cart-success", {
        state: {
          orderNumber: response.order_number,
          total: response.total
        }
      });
    } catch {
      alert("No se pudo finalizar la compra");
    }
  };

  if (loading) return <div className="cart-loading">Cargando...</div>;

  return (
    <div className="cart-container">
      <h1 className="cart-title"><span role="img" aria-label="cart">🛒</span> Tu carrito</h1>
      <div className="cart-table">
        <div className="cart-table-header">
          <div>Producto</div>
          <div>Precio</div>
          <div>Cantidad</div>
          <div>Subtotal</div>
        </div>
        {items.length === 0 ? (
          <div style={{ color: "#fff", padding: "2rem", textAlign: "center" }}>
            Tu carrito está vacío.
          </div>
        ) : (
          items.map(item => (
            <div className="cart-table-row" key={item.id}>
              <div className="cart-product">
                <img
                  src={
                    item.product?.image
                      ? getLocalProductImage(item.product.image)
                      : ""
                  }
                  alt={item.product?.name}
                  className="cart-product-img"
                />
                <span>{item.product?.name}</span>
              </div>
              <div>${parseFloat(item.product?.final_price || 0).toFixed(2)}</div>
              <div>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => handleQuantityChange(item.id, Number(e.target.value))}
                  className="cart-qty-input"
                />
              </div>
              <div>${(parseFloat(item.product?.final_price || 0) * item.quantity).toLocaleString()}</div>
              <button className="cart-remove-btn" onClick={() => handleRemove(item.id)}>×</button>
            </div>
          ))
        )}
      </div>

      <div className="cart-promo-row">
        <input
          type="text"
          placeholder="Código de promoción"
          value={promo}
          onChange={e => setPromo(e.target.value)}
          className="cart-promo-input"
        />
        <button className="cart-promo-btn" onClick={handleApplyPromo}>Aplicar</button>
      </div>

      <div className="cart-summary-row">
        <div className="cart-summary">
          <div>Subtotal</div>
          <div>${subtotal.toLocaleString()}</div>
          <div>Total</div>
          <div>${total.toLocaleString()}</div>
        </div>
        <div className="cart-payment">
          <div>Método de pago</div>
          <label>
            <input type="radio" checked={payment === "transfer"} onChange={() => setPayment("transfer")} />
            Transferencia bancaria directa
          </label>
          <label>
            <input type="radio" checked={payment === "cod"} onChange={() => setPayment("cod")} />
            Contra reembolso
          </label>
          <label>
            <input type="radio" checked={payment === "mp"} onChange={() => setPayment("mp")} />
            Débito o crédito a través de mercado pago
          </label>
          <button className="cart-checkout-btn" onClick={handleCheckout}>Finalizar compra</button>
        </div>
      </div>

      <div className="cart-benefits-row">
        <div>
          <span role="img" aria-label="envio">🚚</span>
          <div>Envío gratis<br />a todo el país</div>
        </div>
        <div>
          <span role="img" aria-label="descuento">💸</span>
          <div>10% OFF<br />efectivo / transferencia</div>
        </div>
        <div>
          <span role="img" aria-label="cuotas">💳</span>
          <div>3 cuotas<br />sin interés</div>
        </div>
      </div>
    </div>
  );
};

export default Cart;