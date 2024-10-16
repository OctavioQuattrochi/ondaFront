import React from 'react';
import '../Styles/product_sheet.css';

const Product_sheet = () => {
  return (
    <div className="catalog-page">
    <h1 className="catalog-title">Nuestras Ondas</h1>
    <div className="product-container">
      <div className="product-item">
        <img className="product-image" src="https://via.placeholder.com/150" alt="Onda bb" />
        <div className="product-name">Onda bb</div>
        <div className="product-price">$7.999</div>
      </div>
      <div className="product-item">
        <img className="product-image" src="https://via.placeholder.com/150" alt="Onda sunset" />
        <div className="product-name">Onda sunset</div>
        <div className="product-price">$7.999</div>
      </div>
      <div className="product-item">
        <img className="product-image" src="https://via.placeholder.com/150" alt="Onda astros" />
        <div className="product-name">Onda astros</div>
        <div className="product-price">$7.999</div>
      </div>
    </div>
  </div>
);
}
export default Product_sheet;
