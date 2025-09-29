/** @format */

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/users/Home";
import Login from "./pages/login/login";
import Dashboard from "./pages/admin/Dashboard";
import Register from "./pages/login/register";
import HomeAdmin from "./pages/admin/HomeAdmin";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner.jsx";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      console.log("Token yang dikirim:", token);

      if (!token) {
        navigate("/login");
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
        console.log("Respon auth:", data.token);

        if (data.logged_in) {
          setUser(data.user);
        } else {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error saat cek auth:", error);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [location]);

  if (loading) {
    return <div><LoadingSpinner/></div>;
  }

  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      {user ? (
        <>
          {user.role === "admin" && (
            <>
              <Route path='/admin/dashboard' element={<Dashboard />} />
              <Route path='/admin/home' element={<HomeAdmin />} />
            </>
          )}
          {user.role === "user" && <Route path='/home' element={<Home />} />}
        </>
      ) : (
        <Route path='*' element={<Login />} />
      )}
    </Routes>
  );
}

export default App;
