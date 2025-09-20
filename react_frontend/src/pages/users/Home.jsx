import '../../App.css';
import NavBar from '../../component/Navbar.jsx';
import Footer from '../../component/Footer.jsx';
import ProductCard from '../../component/ProductCard.jsx';
import RecommendationCard from '../../component/RecommendationCard.jsx';
import BukuFiksi from '../../services/data.jsx';

function Home() {
  const recommendationsData = [
    {
      id: 1,
      name: "Stylish Backpack",
      desc: "Black",
      price: "$55"
    },
    {
      id: 2,
      name: "Wireless Headphones",
      desc: "Bluetooth",
      price: "$55"
    },
    {
      id: 3,
      name: "Smart Watch",
      desc: "Silver",
      price: "$55"
    },
    {
      id: 4,
      name: "Yoga Mat",
      desc: "Eco-friendly",
      price: "$55"
    },
    {
      id: 5,
      name: "Coffee Maker",
      desc: "Automatic",
      price: "$55"
    },
    {
      id: 6,
      name: "Travel Mug",
      desc: "Industrial",
      price: "$55"
    },
    {
      id: 7,
      name: "LED Lamp",
      desc: "Medium",
      price: "$55"
    },
    {
      id: 8,
      name: "Fitness Tracker",
      desc: "Waterproof",
      price: "$55"
    }
  ];

  return (
    <div>
      <NavBar />
      <section className="hero">
        <div className="container">
          <h1>Tambah Bacaan Kamu</h1>
          <p>
            Update Koleksi Bacaan Kamu! Lihat buku terbaru yang siap kamu
            jelajahi.
          </p>
          <a href="#" className="btn">Jelajahi</a>
        </div>
      </section>

      <section className="container section">
        <div className="section-header">
          <h2 className="section-title">Buku NonFiksi</h2>
          <a href="#" className="view-all">View all</a>
        </div>
        <p className="section-desc">
          Jelajahi macam-macam buku skripsi, jurnal, esai, karya ilmiah, biografi,
          autobiografi, buku motivasi, dan lainnya.
        </p>
          <BukuFiksi/>
      </section>  

      <section className="recommendation">
        <div className="container">
          <div className="recommendation-header">
            <h2>Rekomendasi Untuk Kamu</h2>
            <p>Pilihan buku terbaik untuk kamu baca minggu ini.</p>
          </div>

          <div className="recommendation-grid">
            {recommendationsData.map(recommendation => (
              <RecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
              />
            ))}
          </div>

          <div className="recommendation-footer">
            <a href="#" className="view-all">View all</a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;