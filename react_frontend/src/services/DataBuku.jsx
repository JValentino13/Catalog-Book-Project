import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard.jsx";
import "../App.css";

function BukuFiksi() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/books")
      .then(res => res.json())
      .then(data => {
        console.log("Books:", data);
        setProducts(data || []);
      })
      .catch(err => console.error("Error fetch:", err));
  }, []);


  return (
    <div className='product-grid'>
      {products.map((book) => (
        <ProductCard key={book.id} product={book} />
      ))}
    </div>
  );
}

export default BukuFiksi;
