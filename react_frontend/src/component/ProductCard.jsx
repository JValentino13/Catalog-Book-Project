/** @format */

import React from "react";
import "../App.css";

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    alert(`Anda memilih buku: ${product.name}`);
  };

  return (

      <div className='product-card' data-id={product.id}>
        <div className='product-image'>
          <img src={product.image} alt={product.name} className='product-img' />
        </div>
        <div className='product-info'>
          <h3 className='product-name'>{product.name}</h3>
          <p className='product-author'>Penulis: {product.author}</p>
          <p className='product-category'>{product.category}</p>
          <p className='product-price'>{product.price}</p>
          <button className='add-to-cart' onClick={handleAddToCart}>
            Lihat Detail
          </button>
        </div>
      </div>
    
  );
};

export default ProductCard;
