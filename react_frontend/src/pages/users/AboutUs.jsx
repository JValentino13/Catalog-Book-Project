/** @format */

import React from "react";
import "./style/AboutUs.css";
import Navbar from "../../component/Navbar";
import Footer from "../../component/Footer"

function AboutUs() {
  return (
    <div className='founder-page'>
      <Navbar />
      <div className='founder-container'>
        <section className='founder-header'>
          <div className='founder-img-container'>
            <img src='/images/valen.jpg' alt='founder-img' />
          </div>
          <div className='founder-column'>
            <h1 className='founder-title'>Jonathan Valentino</h1>
            <p className='founder-tagline'>Tabba Founder</p>

            <div className='founder-bio'>
              <p>
                Valen adalah seorang proggramer dari Indonesia — Seseorang yang
                memiliki tekad besar dalam dunia IT. Sebagai seorang{" "}
                <strong>FrontEnd</strong>, <strong>BackEnd</strong>, dan{" "}
                <strong>Cyber Programmer</strong>, ia membantu perusahaan
                rintisan dan perusahaan menciptakan antarmuka yang jelas, merek
                yang kuat, dan pengalaman digital yang menginspirasi.
              </p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className='section-divider'></div>

        {/* Trends Section */}
        <section className='trends-section'>
          <h2 className='section-title'>Trends</h2>

          <div className='trends-list'>
            {/* Founder */}
            <div className='trend-item'>
              <div className='trend-main'>
                <strong>Founder</strong>
                <div className='trend-sub'>
                  <span className='company'>Jonathan Valentino</span>
                  <span className='year-status'>2025 → New</span>
                </div>
              </div>
            </div>

            {/* Framer Partner */}
            <div className='trend-item'>
              <div className='trend-main'>
                <strong>Figma Partner</strong>
                <div className='trend-sub'>
                  <span className='company'>Figma</span>
                  <span className='year-status'>2024 → New</span>
                </div>
              </div>
            </div>

            {/* Contra Partner */}
            <div className='trend-item'>
              <div className='trend-main'>
                <strong>Render Partner</strong>
                <div className='trend-sub'>
                  <span className='company'>Render</span>
                  <span className='year-status'>2025 → New</span>
                </div>
              </div>
            </div>

            {/* Shopify Partner */}
            <div className='trend-item'>
              <div className='trend-main'>
                <strong>Firebase Partner</strong>
                <div className='trend-sub'>
                  <span className='company'>Firebase</span>
                  <span className='year-status'>2025 → New</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  );
}

export default AboutUs;
