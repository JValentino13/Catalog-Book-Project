/** @format */
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/users/Home";
import Login from "./pages/login/login";
import Dashboard from "./pages/admin/Dashboard";
import Register from "./pages/login/register";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner.jsx";
import CategoriesPage from "./pages/users/Category.jsx";
import AboutPage from "./pages/users/AboutUs.jsx";
import ProductDetail from "./component/DetailProduct.jsx";
import Navbar from "./component/Navbar.jsx"; // pastikan path sesuai
import Footer from "./component/Footer.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const publicPaths = ["/login", "/register"];
    const token = localStorage.getItem("token");

    // Jika belum login dan bukan di halaman login/register
    if (!token && !publicPaths.includes(location.pathname)) {
      navigate("/home");
      setUser(null);
      setLoading(false);
      return;
    }

    // Jika sudah login, ambil data user
    const checkAuth = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://127.0.0.1:8000/api/auth", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.logged_in) {
          setUser(data.user);
          localStorage.setItem("role", data.user.role);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error saat cek auth:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [location, navigate]);

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/category' element={<CategoriesPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/product/:productId' element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default App;
