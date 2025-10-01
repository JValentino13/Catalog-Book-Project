/** @format */

import React, { useState, useEffect } from "react";
import "./style/Category.css";
import NavBar from "../../component/Navbar.jsx";
import Footer from "../../component/Footer.jsx";
import ProductCard from "../../component/ProductCard.jsx";
import ProductDetail from "../../component/DetailProduct.jsx";

const CategoriesPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("rekomen");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [filters, setFilters] = useState({
    category: "all",
    rating: "all",
  });

  // Kategori untuk filter
  const categories = React.useMemo(
    () => [
      { id: "all", name: "Semua Kategori" },
      { id: "fiksi", name: "Fiksi" },
      { id: "non-fiksi", name: "Non-Fiksi" },
      { id: "novel", name: "Novel" },
      { id: "psikologi", name: "Psikologi" },
      { id: "filsafat", name: "Filsafat" },
      { id: "sejarah", name: "Sejarah" },
      { id: "bisnis", name: "Bisnis" },
    ],
    []
  );

  const sortOptions = [
    { id: "rekomen", name: "Rekomendasi" },
    { id: "rating", name: "Rating Tertinggi" },
    { id: "nama", name: "Nama A-Z" },
    { id: "nama_desc", name: "Nama Z-A" },
  ];

  // Data buku
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/books")
      .then((res) => res.json())
      .then((data) => {
        console.log("Books:", data);
        setBooks(data || []);
      })
      .catch((err) => console.error("Error fetch buku:", err));
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const categoryCounts = categories.map((cat) => {
        if (cat.id === "all") {
          return { ...cat, count: books.length };
        }
        const count = books.filter((book) => book.kategori === cat.id).length;
        return { ...cat, count };
      });

      categories.forEach((cat, index) => {
        categories[index].count = categoryCounts[index].count;
      });

      setIsLoading(false);
    };

    loadData();
  }, [books, categories]);

  // Filter
  useEffect(() => {
    let result = [...books];

    if (sortBy === "rating") {
      result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    } else if (sortBy === "nama") {
      result.sort((a, b) => a.nama.localeCompare(b.nama));
    } else if (sortBy === "nama_desc") {
      result.sort((a, b) => b.nama.localeCompare(a.nama));
    } else if (sortBy === "rekomen") {
    }

    // Search
    if (searchTerm) {
      result = result.filter(
        (book) =>
          book.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.penulis.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.category !== "all") {
      result = result.filter(
        (book) =>
          book.kategori?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Rating
    if (filters.rating !== "all") {
      const minRating = parseFloat(filters.rating);
      result = result.filter((book) => parseFloat(book.rating) >= minRating);
    }

    setFilteredBooks(result);
  }, [books, sortBy, filters, searchTerm]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      category: "all",
      rating: "all",
    });
    setSearchTerm("");
    setSortBy("rekomen");
  };

  return (
    <div className='recommendations-page'>
      <NavBar />

      {/* Hero Section */}
      <section className='recommendations-hero'>
        <div className='container'>
          <div className='hero-content'>
            <h1>Rekomendasi Buku Terbaik</h1>
            <p>
              Temukan buku-buku pilihan kami yang telah dikurasi khusus untuk
              Anda. Berdasarkan rating, popularitas, dan tren terkini.
            </p>
            <div className='hero-stats'>
              <div className='stat'>
                <span className='stat-number'>{books.length}+</span>
                <span className='stat-label'>Buku Tersedia</span>
              </div>
              <div className='stat'>
                <span className='stat-number'>4.5+</span>
                <span className='stat-label'>Rating Rata-rata</span>
              </div>
              <div className='stat'>
                <span className='stat-number'>50+</span>
                <span className='stat-label'>Buku Bestseller</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='recommendations-section'>
        <div className='container'>
          <div className='recommendations-content'>
            {/* Filters */}
            <aside className='filters-sidebar'>
              <div className='filters-header'>
                <h3>Filter Buku</h3>
                <button className='clear-filters' onClick={clearAllFilters}>
                  Reset
                </button>
              </div>

              {/* Search */}
              <div className='filter-group'>
                <label className='filter-label'>Cari Buku</label>
                <div className='search-filter'>
                  <input
                    type='text'
                    placeholder='Judul, penulis, atau kata kunci...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='search-input'
                  />
                  <span className='search-icon'>🔍</span>
                </div>
              </div>

              {/* Kategori */}
              <div className='filter-group'>
                <label className='filter-label'>Kategori</label>
                <div className='filter-options'>
                  {categories.map((category) => (
                    <label key={category.id} className='filter-option'>
                      <input
                        type='radio'
                        name='category'
                        value={category.id}
                        checked={filters.category === category.id}
                        onChange={(e) =>
                          handleFilterChange("category", e.target.value)
                        }
                      />
                      <span className='checkmark'></span>
                      <span>{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className='filter-group'>
                <label className='filter-label'>Rating Minimum</label>
                <div className='filter-options'>
                  {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                    <label key={rating} className='filter-option'>
                      <input
                        type='radio'
                        name='rating'
                        value={rating}
                        checked={filters.rating === rating.toString()}
                        onChange={(e) =>
                          handleFilterChange("rating", e.target.value)
                        }
                      />
                      <span className='checkmark'></span>
                      <span>{rating}+ ⭐</span>
                    </label>
                  ))}
                  <label className='filter-option'>
                    <input
                      type='radio'
                      name='rating'
                      value='all'
                      checked={filters.rating === "all"}
                      onChange={(e) =>
                        handleFilterChange("rating", e.target.value)
                      }
                    />
                    <span className='checkmark'></span>
                    <span>Semua Rating</span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className='recommendations-main'>
              <div className='recommendations-header'>
                <div className='results-info'>
                  <h2>Rekomendasi Untuk Anda</h2>
                  <p className='results-count'>
                    Menampilkan {filteredBooks.length} dari {books.length} buku
                  </p>
                </div>

                <div className='sorting-controls'>
                  <label htmlFor='sort-select'>Urutkan:</label>
                  <select
                    id='sort-select'
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className='sort-select'>
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              {(filters.category !== "all" ||
                filters.rating !== "all" ||
                searchTerm) && (
                <div className='active-filters'>
                  <span>Filter aktif:</span>
                  {filters.category !== "all" && (
                    <span className='active-filter'>
                      {categories.find((c) => c.id === filters.category)?.name}
                      <button
                        onClick={() => handleFilterChange("category", "all")}>
                        ×
                      </button>
                    </span>
                  )}
                  {filters.rating !== "all" && (
                    <span className='active-filter'>
                      Rating {filters.rating}+
                      <button
                        onClick={() => handleFilterChange("rating", "all")}>
                        ×
                      </button>
                    </span>
                  )}
                  {searchTerm && (
                    <span className='active-filter'>
                      Pencarian: "{searchTerm}"
                      <button onClick={() => setSearchTerm("")}>×</button>
                    </span>
                  )}
                </div>
              )}

              {/* Loading State */}
              {isLoading ? (
                <div className='loading-section'>
                  <div className='loading-spinner'></div>
                  <p>Memuat rekomendasi...</p>
                </div>
              ) : (
                <>
                  {/* Books Grid */}
                  {filteredBooks.length > 0 ? (
                    <div className='books-grid'>
                      {filteredBooks.map((book) => (
                        <ProductCard
                          key={book.id}
                          product={book}
                          onViewDetail={() => setSelectedBook(book)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className='empty-state'>
                      <div className='empty-icon'>🔍</div>
                      <h3>Tidak ada buku ditemukan</h3>
                      <p>Coba ubah filter atau kata kunci pencarian Anda</p>
                      <button className='btn-clear' onClick={clearAllFilters}>
                        Tampilkan Semua Buku
                      </button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </section>
      {selectedBook && (
        <ProductDetail
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
      <Footer />
    </div>
  );
};

export default CategoriesPage;
