import '../App.css';
import { Link } from "react-router-dom";

function Footer() {
    return(
        <footer>
            <div className="container footer-content">
                <div className="footer-logo">Tabba</div>
                <div className="footer-links">
                    <ul>
                        <li><Link to="/">Tentang Kami</Link></li>
                        <li><Link to="/">Kebijakan Privasi</Link></li>
                        <li><Link to="/">Syarat dan Ketentuan</Link></li>
                        <li><Link to="/">Kontak</Link></li>
                    </ul>
                </div>
                <div className="copyright">© 2025 Tabba. All rights reserved.</div>
            </div>
        </footer>
    );
}

export default Footer;