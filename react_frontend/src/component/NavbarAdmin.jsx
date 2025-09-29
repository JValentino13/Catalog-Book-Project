import '../App.css';
import { Link } from "react-router-dom";

function NavbarAdmin() {
    return(
        <header>
            <div className="container header-content">
                <div className="logo">Tabba</div>
                <nav>
                <ul>
                    <li><Link to="/admin/dashboard">Dashboard</Link></li>
                    <li><Link to="/admin/home">Beranda</Link></li>
                    <li><Link to="/kategori">Kategori</Link></li>
                    <li><Link to="/rekomendasi">Rekomendasi</Link></li>
                    <li><Link to="/tentang_kami">Tentang Kami</Link></li>
                </ul>
                </nav>
            </div>
        </header>
    );
}

export default NavbarAdmin;