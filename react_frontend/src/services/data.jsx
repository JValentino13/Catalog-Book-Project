import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard.jsx";
import "../App.css";

function BukuFiksi() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/buku_fiksi")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default BukuFiksi;