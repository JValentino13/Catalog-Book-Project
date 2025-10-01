/** @format */

import "../../App.css";
import NavBar from "../../component/Navbar.jsx";
import Footer from "../../component/Footer.jsx";
import BukuFiksi from "../../services/DataBuku.jsx";

function Home() {

  return (
    <div>
      <NavBar />
      <section className='hero'>
        <div className='container'>
          <div className='hero-content'>
            <h1>
              Discover Your Next<br></br>Literary Adventure
            </h1>
            <p>
              Explore curated collections, discover hidden gems, and connect
              with a community of passionate readers. Your trusted guide through
              the infinite library awaits.
            </p>

            <div className='hero-buttons'>
              <a href='/category' className='btn'>
                Explore Catalog
              </a>
            </div>

            <div className='stats'>
              <div className='stat-item'>
                <span className='stat-number'>2.5M+</span>
                <span className='stat-label'>Books Cataloged</span>
              </div>
              <div className='stat-item'>
                <span className='stat-number'>150K+</span>
                <span className='stat-label'>Active Readers</span>
              </div>
              <div className='stat-item'>
                <span className='stat-number'>50K+</span>
                <span className='stat-label'>Authors Featured</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='container section'>
        <div className='section-header'>
          <h2 className='section-title'>Koleksi Buku</h2>
          <a href='/category' className='view-all'>
            View all
          </a>
        </div>
        <p className='section-desc'>
          Jelajahi macam-macam buku skripsi, jurnal, esai, karya ilmiah,
          biografi, autobiografi, buku motivasi, dan lainnya.
        </p>
        <BukuFiksi />
      </section>
      <Footer />
    </div>
  );
}

export default Home;
