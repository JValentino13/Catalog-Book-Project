/** @format */

import React from "react";
import "../App.css";

const ProductCard = ({ product, onViewDetail }) => {
  return (
    <div className='product-card' data-id={product.id}>
      <div className='product-image' onClick={() => onViewDetail(product)}>
        {product.coverImage && (
          <img src={product.coverImage} alt={product.nama} width='100%' />
        )}
      </div>
      <div className='product-info'>
        <h3 className='product-name'>{product.nama}</h3>
        <p className='product-author'>
          Penulis : <strong>{product.penulis}</strong>
        </p>
        <p className='product-category'>
          {product.kategori} :{" "}
          {product.deskripsi.length > 120
            ? product.deskripsi.substring(0, 120) + "..."
            : product.deskripsi}
        </p>
        <p className='product-rating'><i class="fi fi-br-star-sharp-half-stroke"></i> {product.rating}</p>
        <button
          className='add-to-cart'
          onClick={() => onViewDetail(product)}
        >
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
