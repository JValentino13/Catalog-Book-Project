/** @format */

import "../App.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className='ecotricity-footer'>
      <div className='footer-container'>
        {/* Main Footer Content */}
        <div className='footer-main'>
          {/* Brand Section */}
          <div className='footer-brand'>
            <h2 className='footer-logo'>Tabba</h2>
            <p className='footer-tagline'>
              Pendamping perpustakaan digital terlengkap
            </p>
          </div>

          {/* Links Sections */}
          <div className='footer-links-grid'>
            <div className='footer-section'>
              <h3 className='section-title-footer'>Saya Tertarik Dengan</h3>
              <ul className='footer-links'>
                <li>
                  <Link to='/category'>Buku Fiksi</Link>
                </li>
                <li>
                  <Link to='/category'>Buku Non-Fiksi</Link>
                </li>
                <li>
                  <Link to='/category'>Buku Anak</Link>
                </li>
                <li>
                  <Link to='/category'>Buku Pelajaran</Link>
                </li>
                <li>
                  <Link to='/category'>Berita Buku</Link>
                </li>
                <li>
                  <Link to='/category'>Buku Terpopuler</Link>
                </li>
              </ul>
            </div>

            <div className='footer-section'>
              <h3 className='section-title-footer'>Bantuan</h3>
              <ul className='footer-links'>
                <li>
                  <Link to='/about'>FAQ</Link>
                </li>
                <li>
                  <Link to='/about'>Pusat Bantuan</Link>
                </li>
                <li>
                  <Link to='/about'>Akun Saya</Link>
                </li>
                <li>
                  <Link to='/about'>Status Layanan</Link>
                </li>
                <li>
                  <Link to='/about'>Hubungi Kami</Link>
                </li>
              </ul>
            </div>

            <div className='footer-section'>
              <h3 className='section-title-footer'>Perusahaan</h3>
              <ul className='footer-links'>
                <li>
                  <Link to='/about'>Tentang Kami</Link>
                </li>
                <li>
                  <Link to='/about'>Layanan Kami</Link>
                </li>
                <li>
                  <Link to='/about'>Syarat & Ketentuan</Link>
                </li>
                <li>
                  <Link to='/about'>Kebijakan Privasi</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='footer-divider'></div>

        <div className='footer-partners'>
          <div className='partner-logos'>
            <div className='partner-items'>
              <img src='/images/vish.png' alt='vish-img' />
              <div className='partner-item'>
                <span className='partner-name'>VISH</span>
                <span className='partner-desc'>by Jonathan Valentino</span>
              </div>
            </div>
            <div className='partner-items'>
              <img src='/images/bn.png' alt='BN' />
              <div className='partner-item'>
                <span className='partner-name'>BAGIMU NEGERIKU</span>
              </div>
            </div>
          </div>
        </div>

        <div className='footer-bottom'>
          <div className='copyright'>
            ©2025 Tabba Indonesia semua hak dilindungi.
          </div>
          <div className='powered-by'>
            Didukung oleh <strong>VCorps</strong>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
