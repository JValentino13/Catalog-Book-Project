import '../../App.css';
import NavBar from '../../component/Navbar.jsx';
import Footer from '../../component/Footer.jsx';
import ProductCard from '../../component/ProductCard.jsx';
import RecommendationCard from '../../component/RecommendationCard.jsx';

function Home() {
  // Data produk (biasanya dari API/state management)
  const productsData = [
    {
      id: 1,
      name: "Seni Berpikir Jernih",
      category: "Psikologi",
      price: "Rp 89.000",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      name: "Sejarah Dunia yang Disembunyikan",
      category: "Sejarah",
      price: "Rp 112.000",
      image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "Atomic Habits",
      category: "Pengembangan Diri",
      price: "Rp 97.500",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      name: "Filosofi Teras",
      category: "Filsafat",
      price: "Rp 85.000",
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
    },
  ];

  // Data rekomendasi
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

        <div className="product-grid">
          {productsData.map(product => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
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