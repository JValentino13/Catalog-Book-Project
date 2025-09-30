import '../App.css';
import { Link } from "react-router-dom";

function Navbar() {
    const role = localStorage.getItem("role");

    if (role !== "user") {
        return(
        <header>
            <div className="container header-content">
                <div className="logo">Tabba</div>
                <nav>
                <ul>
                    <li><Link to="/admin/dashboard">Dashboard</Link></li>
                    <li><Link to="/home">Beranda</Link></li>
                    <li><Link to="/category">Kategori</Link></li>
                    <li><Link to="/about">Tentang Kami</Link></li>
                </ul>
                </nav>
            </div>
        </header>
    );
    }
    return(
        <header>
            <div class="container header-content">
                <div class="logo">Tabba</div>
                <nav>
                <ul>
                    <li><Link to="/home">Beranda</Link></li>
                    <li><Link to="/category">Kategori</Link></li>
                    <li><Link to="/about">Tentang Kami</Link></li>
                </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;