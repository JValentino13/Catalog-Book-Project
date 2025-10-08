/** @format */

import React, { useEffect, useState, useRef } from "react";
import ProductCard from "../component/ProductCard.jsx";
import ProductDetail from "../component/DetailProduct.jsx";
import "../App.css";

function BukuFiksi() {
  const [products, setProducts] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const scrollRef = useRef(null);
  const trackRef = useRef(null);
  const isDragging = useRef(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/books")
      .then((res) => res.json())
      .then((data) => {
        const filtered = (data || []).filter(
          (item) =>
            item.status === "Published" && parseFloat(item.rating) >= 4.5
        );
        setProducts(filtered);
      })
      .catch((err) => console.error("Error fetch:", err));
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    const track = trackRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;
    let moved = false;

    const handleMouseDown = (e) => {
      isDown = true;
      moved = false;
      container.classList.add("active");
      if (track) track.style.animationPlayState = "paused";
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      container.classList.remove("active");
      if (track) track.style.animationPlayState = "running";
    };

    const handleMouseUp = (e) => {
      container.classList.remove("active");
      if (track) track.style.animationPlayState = "running";
      if (!moved) {
        e.target.click();
      }
      isDown = false;
      isDragging.current = false;
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      if (Math.abs(walk) > 5) moved = true;
      container.scrollLeft = scrollLeft - walk;
      isDragging.current = true;
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className='home-book' ref={scrollRef}>
      <div className='product-track' ref={trackRef}>
        <div className='product-grid'>
          {products.concat(products).map((book, index) => (
            <ProductCard
              key={index}
              product={book}
              onViewDetail={() => setSelectedBook(book)}
            />
          ))}
        </div>
      </div>

      {selectedBook && (
        <ProductDetail
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
}

export default BukuFiksi;
