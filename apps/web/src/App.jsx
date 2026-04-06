// src/App.jsx
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useRoutes,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


// Pages
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Finance from "./pages/Finance";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Components
import Navbar from "./components/Navbar";

// React Router v7 future flags
import { useNavigate } from "react-router-dom";

// AppRouter usando useRoutes para rutas más limpias y sin warnings futuros
function AppRouter() {
    const routes = useRoutes([
        { path: "/", element: <Navigate to="/dashboard" replace /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "/tasks", element: <Tasks /> },
        { path: "/finance", element: <Finance /> },
        { path: "/login", element: <Login /> },
        { path: "*", element: <NotFound /> }, // Catch-all 404
    ]);

    return routes;
}

export default function App() {
    return (
        <Router>
            <Navbar />
            <React.StrictMode>
                <AppRouter />
            </React.StrictMode>
        </Router>
    );
}