import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../Service/AuthService";
import "../Styles/cart.css";

const getLocalProductImage = (imageName) => {
  if (!imageName) return "";
  return `/src/sources/store/${imageName}`;
};

const PROMO_CODE = "ONDA10";
const PROMO_DISCOUNT = 0.10;

const Cart = () => {
  const [items, setItems] = useState([]);
  const [promo, setPromo] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [payment, setPayment] = useState("transfer");
  const [loading, setLoading] = useState(true);
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.getCartItems()
      .then(data => {
        setItems(Array.isArray(data.items) ? data.items : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getPrecio = (item) => {
    if (item.variant?.price !== undefined && item.variant?.price !== null) {
      return parseFloat(item.variant.price);
    }
    return item.variant?.product?.final_price
      ? parseFloat(item.variant.product.final_price)
      : 0;
  };

  useEffect(() => {
    let sub = items.reduce(
      (acc, item) => acc + (getPrecio(item) * item.quantity),
      0
    );
    if (promoApplied) {
      sub = sub * (1 - PROMO_DISCOUNT);
    }
    setSubtotal(sub);
    setTotal(sub);
  }, [items, promoApplied]);

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
    if (promo.trim().toUpperCase() === PROMO_CODE) {
      setPromoApplied(true);
      alert("¡Código aplicado! 10% de descuento.");
    } else {
      setPromoApplied(false);
      alert("Código inválido.");
    }
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const cartItems = items.map(item => ({
        variant_id: item.variant?.id,
        quantity: item.quantity,
        price_unit: getPrecio(item)
      }));
      const response = await AuthService.checkout({
        payment_method: payment,
        promo,
        items: cartItems
      });
      await AuthService.clearCart();
      navigate("/cart-success", {
        state: {
          orderNumber: response.order_number,
          total: response.total
        }
      });
    } catch {
      alert("No se pudo finalizar la compra");
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (loading) return <div className="cart-loading">Cargando...</div>;

  return (
    <div className="cart-container">
      <h1 className="cart-title"><span role="img" aria-label="cart">🛒</span> Tu carrito</h1>
      <div className="cart-table">
        <div className="cart-table-header">
          <div>Producto</div>
          <div>Color</div>
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
                    item.variant?.product?.image
                      ? getLocalProductImage(item.variant.product.image)
                      : ""
                  }
                  alt={item.variant?.product?.name}
                  className="cart-product-img"
                />
                <span>
                  {item.variant?.product?.name || "--"}
                </span>
              </div>
              <div>{item.variant?.color || "--"}</div>
              <div>${getPrecio(item).toFixed(2)}</div>
              <div>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => handleQuantityChange(item.id, Number(e.target.value))}
                  className="cart-qty-input"
                />
              </div>
              <div>${(getPrecio(item) * item.quantity).toLocaleString()}</div>
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
          disabled={promoApplied}
        />
        <button className="cart-promo-btn" onClick={handleApplyPromo} disabled={promoApplied}>
          {promoApplied ? "Aplicado" : "Aplicar"}
        </button>
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
            <input type="radio" checked={payment === "cod"} disabled />
            Contra reembolso <span style={{ color: "#888", fontSize: "0.9em" }}>(Próximamente)</span>
          </label>
          <label>
            <input type="radio" checked={payment === "mp"} disabled />
            Débito o crédito a través de mercado pago <span style={{ color: "#888", fontSize: "0.9em" }}>(Próximamente)</span>
          </label>
          <button className="cart-checkout-btn" onClick={handleCheckout} disabled={checkoutLoading}>
            {checkoutLoading ? "Procesando compra..." : "Finalizar compra"}
          </button>
          {checkoutLoading && <div className="cart-loading">Procesando compra...</div>}
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