import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/users/Home";
import Login from "./pages/login/login";
import Dashboard from "./pages/admin/Dashboard";
import Register from "./pages/login/register";
import HomeAdmin from "./pages/admin/HomeAdmin";

export const router = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/home', element: <Home /> },
    { path : '/admin/dashboard', element: <Dashboard /> },
    { path : '/admin/home', element: <HomeAdmin /> },
    
])