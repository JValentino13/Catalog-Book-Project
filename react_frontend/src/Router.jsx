import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/users/Home";
import Login from "./pages/login/login";
import Dashboard from "./pages/admin/Dashboard";

export const router = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/home', element: <Home /> },
    { path : '/dashboard', element: <Dashboard /> },
    
])