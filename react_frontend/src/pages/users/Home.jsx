/** @format */

import "../../App.css";
import NavBar from "../../component/Navbar.jsx";
import Footer from "../../component/Footer.jsx";
import BukuFiksi from "../../services/DataBuku.jsx";
import CardSwap, { Card } from "../../component/stylingReactBits/CardSwap.jsx";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../component/ProductCard.jsx";
import ProductDetail from "../../component/DetailProduct.jsx";
import React, { useState, useEffect } from "react";
import RotatingText from "../../component/stylingReactBits/RotatingText.jsx";

function Home() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  const navigate = useNavigate();

  // Ambil data buku
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/books")
      .then((res) => res.json())
      .then((data) => {
        const filtered = (data || []).filter(
          (item) => item.status === "Published"
        );
        setFilteredBooks(filtered);
        setBooks(filtered);
      })
      .catch((err) => console.error("Error fetch:", err));
  }, []);

  // Simulasi loading singkat
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    };
    loadData();
  }, [books]);

  // Hitung pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <NavBar />
      <div className='card-swap'>
        <div className='card-text'>
          <h1>
            Satu Tempat <br />
            untuk Semua Buku
          </h1>
          <h3>
            Kami mengumpulkan berbagai buku dari fiksi hingga ilmiah. <br />
            Semua bisa kamu temukan di satu katalog <br />
            mudah diakses.
          </h3>
          <button onClick={() => navigate("/category")}>Mulai Jelajah</button>
        </div>
        <CardSwap
          cardDistance={60}
          verticalDistance={70}
          delay={3000}
          pauseOnHover={false}>
          <Card>
            <img src='/images/1.png' alt='1' />
          </Card>
          <Card>
            <img src='/images/2.png' alt='2' />
          </Card>
          <Card>
            <img src='/images/3.png' alt='3' />
          </Card>
        </CardSwap>
      </div>

      {/* Buku Terpopuler */}
      <section className='container section'>
        <div className='section-header'>
          <h2 className='secTitle'>Buku Terpopuler</h2>
          <a href='/category' className='view-all'>
            View all
          </a>
        </div>
        <p className='section-desc'>
          Beberapa Buku Terpopuler, yang banyak dinikmati dan dicari para
          penikmat buku.
        </p>
        <div className='home-book'>
          <BukuFiksi />
        </div>
      </section>

      {/* Divider Content */}
      <section className='container section'>
        <div className='divider-home'>
          <img src='/images/divider.png' alt='divider-img' />
          <div className='divider-content'>
            <div className='divider-main-text'>
              <h1>Jelajahi Berbagai Buku</h1>
              <h1>
                <RotatingText
                  texts={["Fiksi", "Non Fiksi", "Novel", "Psikologi", "Filsafat", "Sejarah", "Bisnis"]}
                  mainClassName='px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg'
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName='overflow-hidden pb-0.5 sm:pb-1 md:pb-1'
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </h1>
            </div>
            <h1>Dari Browser Anda!!</h1>
            <p>
              Gunakan fitur pencarian untuk menemukan buku dalam hitungan detik.
              Setiap buku dilengkapi deskripsi, status ketersediaan, dan detail
              penerbit.
            </p>
          </div>
        </div>
      </section>

      {/* Koleksi Buku */}
      <section className='container section'>
        <div className='section-header'>
          <h2 className='secTitle'>Koleksi Buku</h2>
          <a href='/category' className='view-all'>
            View all
          </a>
        </div>
        <p className='section-desc'>
          Jelajahi macam-macam buku skripsi, jurnal, esai, karya ilmiah,
          biografi, autobiografi, buku motivasi, dan lainnya.
        </p>

        {isLoading ? (
          <div className='loading-section'>
            <div className='loading-spinner'></div>
            <p>Memuat rekomendasi...</p>
          </div>
        ) : (
          <>
            {currentBooks.length > 0 ? (
              <>
                <div className='books-grid'>
                  {currentBooks.map((book) => (
                    <ProductCard
                      key={book.id}
                      product={book}
                      onViewDetail={() => setSelectedBook(book)}
                    />
                  ))}
                </div>

                {/* Tombol Navigasi */}
                <div className='pagination-controls'>
                  <button
                    className='btn-pagination'
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}>
                    Sebelumnya
                  </button>

                  <span className='page-info'>
                    Halaman {currentPage} dari {totalPages}
                  </span>

                  <button
                    className='btn-pagination'
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}>
                    Selanjutnya
                  </button>
                </div>
              </>
            ) : (
              <div className='empty-state'>
                <i className='fi fi-br-books-lightbulb empty-icon'></i>
                <h3>Tidak ada buku ditemukan</h3>
              </div>
            )}
          </>
        )}
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
}

export default Home;
