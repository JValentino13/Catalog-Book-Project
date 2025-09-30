import React from "react";
import "../App.css";

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    alert(`Anda memilih buku: ${product.id}`);
  };

  return (
      <div className='product-card' data-id={product.id}>
        <div className='product-image'>
          {product.coverImage && (
            <img src={product.coverImage} alt={product.nama} width="100%" />
          )}
        </div>
        <div className='product-info'>
          <h3 className='product-name'>{product.nama}</h3>
          <p className='product-author'>Penulis : <strong>{product.penulis}</strong></p>
          <p className='product-category'>{product.kategori} : {product.deskripsi}</p>
          <p className='product-rating'>⭐   {product.rating}</p>
          <button className='add-to-cart' onClick={handleAddToCart}>
            Lihat Detail
          </button>
        </div>
      </div>
    
  );
};

export default ProductCard;
