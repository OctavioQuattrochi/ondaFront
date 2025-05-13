import React from 'react';
import '../Styles/store.css';
import bb from '../sources/store/bb.png'; 
import sunset from '../sources/store/Sunset.png'; 
import astro from '../sources/store/Astro.png';

const Store = () => {
  return (
    <div className="catalog-page">
      <h1 className="catalog-title">NUESTRAS ONDAS</h1>
      <div className="product-container">
        <div className="product-item">
          <img className="product-image" src={bb} alt="Onda bb" />
          <div className="product-name">Onda bb</div>
          <div className="product-price">$7.999</div>
        </div>
        <div className="product-item">
          <img className="product-image" src={sunset} alt="Onda Sunset" />
          <div className="product-name">Onda Sunset</div>
          <div className="product-price">$7.999</div>
        </div>
        <div className="product-item">
          <img className="product-image" src={astro} alt="Onda Astros" />
          <div className="product-name">Onda Astros</div>
          <div className="product-price">$7.499</div>
        </div>
      </div>
    </div>
  );
};

export default Store;
