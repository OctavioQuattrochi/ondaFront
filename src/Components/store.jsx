import React from 'react';
import '../Styles/store.css';
import bb from '../sources/store/bb.png'; 
import sunset from '../sources/store/Sunset.png'; 
import astro from '../sources/store/Astro.png';

const Store = () => {
  return (
    <div className="catalog-page">
    <h1 className="catalog-title">Nuestras Ondas</h1>
    <div className="product-container">
      <div className="product-item">
        <img className="product-image" src={bb} alt="Onda bb" />
        <div className="product-name">Onda bb</div>
        <div className="product-price">$7.999</div>
      </div>
      <div className="product-item">
        <img className="product-image" src={sunset} alt="Onda sunset" />
        <div className="product-name">Onda sunset</div>
        <div className="product-price">$7.999</div>
      </div>
      <div className="product-item">
        <img className="product-image" src={astro} alt="Onda astros" />
        <div className="product-name">Onda astros</div>
        <div className="product-price">$7.999</div>
      </div>
    </div>
  </div>
);
}
export default Store;
