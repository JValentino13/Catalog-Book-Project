import React from 'react';
import { Link } from 'react-router-dom';
import './style/AboutUs.css';
import NavBar from "../../component/Navbar.jsx";
import Footer from "../../component/Footer.jsx";

const AboutPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Ahmad Wijaya",
      position: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      description: "Pecinta buku dengan pengalaman 10+ tahun di industri penerbitan",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "#"
      }
    },
    {
      id: 2,
      name: "Sarah Santoso",
      position: "Head of Content",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      description: "Ahli kurasi konten dengan latar belakang sastra dan jurnalistik",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "#"
      }
    },
    {
      id: 3,
      name: "Budi Pratama",
      position: "CTO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      description: "Spesialis teknologi dengan passion dalam membangun platform digital",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "#"
      }
    },
    {
      id: 4,
      name: "Maya Sari",
      position: "Community Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      description: "Ahli dalam membangun dan mengelola komunitas pembaca",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "#"
      }
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Tabba Didirikan",
      description: "Dimulai dengan visi untuk membuat platform buku digital yang mudah diakses"
    },
    {
      year: "2021",
      title: "1000 Pengguna Pertama",
      description: "Mencapai tonggak penting 1000 pengguna aktif dalam setahun pertama"
    },
    {
      year: "2022",
      title: "Ekspansi Koleksi",
      description: "Menambah koleksi hingga 5000+ buku dari berbagai genre dan penerbit"
    },
    {
      year: "2023",
      title: "Aplikasi Mobile",
      description: "Meluncurkan aplikasi mobile untuk pengalaman membaca yang lebih baik"
    },
    {
      year: "2024",
      title: "Komunitas Pembaca",
      description: "Membangun komunitas aktif dengan 50.000+ anggota"
    }
  ];

  const values = [
    {
      icon: "📚",
      title: "Aksesibilitas",
      description: "Kami percaya setiap orang berhak mendapatkan akses ke pengetahuan dan literatur berkualitas"
    },
    {
      icon: "💡",
      title: "Inovasi",
      description: "Terus berinovasi dalam menyajikan pengalaman membaca yang lebih baik dan modern"
    },
    {
      icon: "🤝",
      title: "Kolaborasi",
      description: "Bekerja sama dengan penulis, penerbit, dan komunitas untuk berkembang bersama"
    },
    {
      icon: "❤️",
      title: "Passion",
      description: "Didorong oleh kecintaan kami terhadap buku dan keinginan untuk menyebarkan manfaat membaca"
    }
  ];

  return (
    <div className="about-page">
      <NavBar />
      
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Tentang Tabba</h1>
            <p className="hero-subtitle">
              Menghubungkan pembaca dengan dunia literasi melalui teknologi modern
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Anggota Komunitas</span>
              </div>
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Koleksi Buku</span>
              </div>
              <div className="stat">
                <span className="stat-number">5</span>
                <span className="stat-label">Tahun Pengalaman</span>
              </div>
              <div className="stat">
                <span className="stat-number">100+</span>
                <span className="stat-label">Penerbit Mitra</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mission-card">
              <div className="card-icon">🎯</div>
              <h3>Misi Kami</h3>
              <p>
                Menjadi platform terdepan dalam mendemokratisasi akses ke literatur berkualitas 
                dengan menghubungkan pembaca, penulis, dan penerbit dalam ekosistem yang saling 
                menguntungkan.
              </p>
            </div>
            <div className="vision-card">
              <div className="card-icon">🔭</div>
              <h3>Visi Kami</h3>
              <p>
                Menciptakan masyarakat yang melek literasi di mana setiap individu memiliki 
                akses mudah ke pengetahuan dan dapat menemukan buku yang menginspirasi 
                perjalanan hidup mereka.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="our-story">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Cerita Kami</h2>
              <p>
                Tabba dimulai pada tahun 2020 dari obrolan sederhana di sebuah kedai kopi 
                tentang bagaimana sulitnya menemukan buku-buku berkualitas dalam format digital 
                yang mudah diakses.
              </p>
              <p>
                Didirikan oleh sekelompok pecinta buku dan teknolog, kami memiliki misi 
                untuk menjembatani kesenjangan antara tradisi membaca buku fisik dengan 
                kemudahan teknologi digital.
              </p>
              <p>
                Hari ini, Tabba telah berkembang menjadi platform terpercaya dengan ribuan 
                buku dari berbagai genre, melayani puluhan ribu pembaca setia di seluruh 
                Indonesia.
              </p>
            </div>
            <div className="story-image">
              <img 
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Team collaboration" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>Nilai-Nilai Kami</h2>
            <p>Prinsip-prinsip yang membimbing setiap langkah kami</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Tim Kami</h2>
            <p>Orang-orang di balik kesuksesan Tabba</p>
          </div>
          <div className="team-grid">
            {teamMembers.map(member => (
              <div key={member.id} className="team-card">
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="position">{member.position}</p>
                  <p className="description">{member.description}</p>
                  <div className="social-links">
                    <a href={member.social.linkedin} aria-label="LinkedIn">
                      <span>💼</span>
                    </a>
                    <a href={member.social.twitter} aria-label="Twitter">
                      <span>🐦</span>
                    </a>
                    <a href={member.social.email} aria-label="Email">
                      <span>📧</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="milestones-section">
        <div className="container">
          <div className="section-header">
            <h2>Perjalanan Kami</h2>
            <p>Tonggak penting dalam perjalanan Tabba</p>
          </div>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-year">{milestone.year}</div>
                <div className="timeline-content">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Bergabunglah dengan Komunitas Kami</h2>
            <p>
              Jadilah bagian dari perjalanan kami dalam membangun masyarakat yang lebih melek literasi. 
              Temukan buku-buku inspiratif, bergabung dengan diskusi, dan kembangkan pengetahuan Anda.
            </p>
            <div className="cta-buttons">
              <Link to="/register" className="btn-primary">
                Daftar Sekarang
              </Link>
              <Link to="/categories" className="btn-secondary">
                Jelajahi Buku
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