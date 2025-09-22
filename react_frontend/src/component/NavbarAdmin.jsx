import '../App.css';
import { Link } from "react-router-dom";

function NavbarAdmin() {
    return(
        <header>
            <div class="container header-content">
                <div class="logo">Tabba</div>
                <nav>
                <ul>
                    <li><Link to="/admin/dashboard">Dashboard</Link></li>
                    <li><Link to="/admin/home">Beranda</Link></li>
                    <li><Link to="/">Kategori</Link></li>
                    <li><Link to="/">Rekomendasi</Link></li>
                    <li><Link to="/">Tentang Kami</Link></li>
                </ul>
                </nav>
            </div>
        </header>
    );
}

export default NavbarAdmin;