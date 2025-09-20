import '../App.css';

function Navbar() {
    return(
        <header>
            <div class="container header-content">
                <div class="logo">Tabba</div>
                <nav>
                <ul>
                    <li><a href="#">Dashboard</a></li>
                    <li><a href="#">Beranda</a></li>
                    <li><a href="#">Kategori</a></li>
                    <li><a href="#">Rekomendasi</a></li>
                    <li><a href="#">Tentang Kami</a></li>
                </ul>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;