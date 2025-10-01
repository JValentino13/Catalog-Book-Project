/** @format */

import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard.jsx";
import ProductDetail from "../component/DetailProduct.jsx";
import "../App.css";

function BukuFiksi() {
  const [products, setProducts] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/books")
      .then((res) => res.json())
      .then((data) => {
        console.log("Books:", data);
        setProducts(data || []);
      })
      .catch((err) => console.error("Error fetch:", err));
  }, []);

  return (
    <div style={{ paddingTop: "90px" }}>
      <div className='product-grid'>
        {products.map((book) => (
          <ProductCard
            key={book.id}
            product={book}
            onViewDetail={() => setSelectedBook(book)}
          />
        ))}

        {selectedBook && (
          <ProductDetail
            book={selectedBook}
            onClose={() => setSelectedBook(null)}
          />
        )}
      </div>
    </div>
  );
}

export default BukuFiksi;
