import React from 'react';

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    alert(`Menambahkan ${product.name} ke keranjang`);
    // Di sini bisa ditambahkan logic untuk menambah ke cart
  };

  return (
    <div className="product-card" data-id={product.id}>
      <div className="product-image">
        <img src={product.image} alt={product.name} className="product-img" />
      </div>
      <div className="product-info">
        <div className="product-name">{product.name}</div>
        <div className="product-category">{product.category}</div>
        <div className="product-price">{product.price}</div>
        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;