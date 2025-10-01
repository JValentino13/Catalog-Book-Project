import React from 'react';
import { Link } from 'react-router-dom';
import './style/AboutUs.css';
import NavBar from '../../component/Navbar.jsx';
import Footer from '../../component/Footer.jsx';

const AboutPage = () => {
  const features = [
    {
      icon: '🚀',
      title: 'Modern',
      description: 'Platform buku digital dengan teknologi terkini untuk pengalaman membaca yang optimal'
    },
    {
      icon: '💎',
      title: 'Kualitas',
      description: 'Kurasi buku-buku berkualitas dari penulis dan penerbit terpercaya'
    },
    {
      icon: '🌍',
      title: 'Akses Global',
      description: 'Jangkauan luas dengan koleksi buku dari berbagai belahan dunia'
    },
    {
      icon: '🔒',
      title: 'Aman',
      description: 'Platform yang aman dan terpercaya untuk transaksi digital Anda'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Pembaca Aktif' },
    { number: '10,000+', label: 'Koleksi Buku' },
    { number: '500+', label: 'Penulis Partner' },
    { number: '95%', label: 'Kepuasan Pengguna' }
  ];

  const team = [
    {
      name: 'Alexandra Chen',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: 'Visioner di balik terciptanya ekosistem membaca digital yang inklusif'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Technology',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: 'Mengawasi pengembangan platform dengan fokus pada user experience'
    },
    {
      name: 'Sophie Williams',
      role: 'Content Director',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      bio: 'Bertanggung jawab atas kurasi konten dan hubungan dengan penerbit'
    }
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'Terus berinovasi dalam menyajikan pengalaman membaca terbaik',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Quality',
      description: 'Hanya menyajikan konten berkualitas tinggi yang terkurasi',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Community',
      description: 'Membangun komunitas pembaca yang saling mendukung',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Accessibility',
      description: 'Membuat literatur berkualitas dapat diakses semua orang',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="about-page">
      <NavBar />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="badge">Tentang Kami</div>
              <h1>
                Menghubungkan <span className="gradient-text">Dunia</span> dengan 
                <span className="gradient-text"> Kata</span>
              </h1>
              <p className="hero-description">
                Tabba adalah platform revolusioner yang mengubah cara kita membaca dan 
                berinteraksi dengan buku. Kami percaya bahwa setiap cerita berhak 
                didengar, dan setiap pembaca berhak menemukan cerita mereka.
              </p>
              <div className="hero-actions">
                <Link to="/register" className="btn-primary">
                  Mulai Perjalanan
                </Link>
                <Link to="/categories" className="btn-secondary">
                  Jelajahi Koleksi
                </Link>
              </div>
            </div>
            <div className="hero-visual">
              <div className="floating-card card-1">
                <div className="card-icon">📚</div>
                <h4>Digital Library</h4>
                <p>Koleksi lengkap dalam genggaman</p>
              </div>
              <div className="floating-card card-2">
                <div className="card-icon">⭐</div>
                <h4>Kurasi Ahli</h4>
                <p>Buku-buku pilihan terbaik</p>
              </div>
              <div className="floating-card card-3">
                <div className="card-icon">💫</div>
                <h4>Experience</h4>
                <p>Pengalaman membaca tak terlupakan</p>
              </div>
              <div className="main-visual">
                <img 
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Reading Experience" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Visi & Misi Kami</h2>
              <div className="mission-grid">
                <div className="mission-card">
                  <div className="mission-icon">🎯</div>
                  <h3>Visi</h3>
                  <p>
                    Menjadi platform literasi digital terdepan yang menginspirasi 
                    jutaan orang untuk menemukan kecintaan pada membaca melalui 
                    teknologi yang manusiawi.
                  </p>
                </div>
                <div className="mission-card">
                  <div className="mission-icon">🚀</div>
                  <h3>Misi</h3>
                  <p>
                    Menghubungkan pembaca dengan konten berkualitas, memberdayakan 
                    penulis dan penerbit, serta menciptakan ekosistem membaca yang 
                    berkelanjutan dan inklusif.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Mengapa Memilih Tabba?</h2>
            <p>Platform membaca modern dengan segudang keunggulan</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>Nilai Inti Kami</h2>
            <p>Prinsip yang membimbing setiap keputusan kami</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className={`value-card ${value.color}`}>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
                <div className="value-decoration"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Tim Inti Kami</h2>
            <p>Orang-orang berdedikasi di balik Tabba</p>
          </div>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                  <div className="image-overlay"></div>
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="role">{member.role}</p>
                  <p className="bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Siap Memulai Perjalanan Membaca Anda?</h2>
            <p>
              Bergabunglah dengan komunitas pembaca modern dan temukan dunia 
              literasi yang tak terbatas bersama Tabba.
            </p>
            <div className="cta-actions">
              <Link to="/register" className="btn-primary">
                Daftar Sekarang
              </Link>
              <Link to="/categories" className="btn-outline">
                Lihat Koleksi
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;