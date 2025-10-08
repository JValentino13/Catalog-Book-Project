/** @format */

import "../App.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ user }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <header>
      <div className="container header-content">
        <div className="logo">Tabba</div>
        <nav>
          <ul>
            {/* Admin Navbar */}
            {role === "admin" ? (
              <>
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                <li><Link to="/home">Beranda</Link></li>
                <li><Link to="/category">Kategori</Link></li>
                <li><Link to="/about">Tentang Kami</Link></li>
                <li onClick={handleLogout}><i className="fi fi-br-user-logout"></i></li>
              </>
            ) : role === "user" ? (
              // User login
              <>
                <li><Link to="/home">Beranda</Link></li>
                <li><Link to="/category">Kategori</Link></li>
                <li><Link to="/about">Tentang Kami</Link></li>
                <li onClick={handleLogout}><i className="fi fi-br-user-logout"></i></li>
              </>
            ) : (
              // Guest (belum login)
              <>
                <li><Link to="/home">Beranda</Link></li>
                <li><Link to="/category">Kategori</Link></li>
                <li><Link to="/about">Tentang Kami</Link></li>
                <li><Link to="/login"><i class="fi fi-br-entrance"></i></Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
