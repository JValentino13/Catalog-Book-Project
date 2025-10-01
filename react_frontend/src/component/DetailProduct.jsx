import React from "react";
import "./DetailProduct.css";

function ProductDetail({ book, onClose }) {
  if (!book) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      > 
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>
        <div className="modal-body">
          <div className="book-cover">
            {book.coverImage ? (
              <img src={book.coverImage} alt={book.nama} />
            ) : (
              <div className="cover-placeholder">No Image</div>
            )}
          </div>
          <div className="book-info">
            <h2 className="book-title">{book.nama}</h2>
            <p className="book-author">{book.penulis}</p>
            <p className="genre-tag">{book.kategori}</p>
            <div className="rating">
              ⭐ {book.rating || "0"} / 5
            </div>
            <div className="synopsis">
              <h3>Deskripsi</h3>
              <p>{book.deskripsi}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
