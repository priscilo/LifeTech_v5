// apps/web/src/pages/NotFound.jsx

import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center",
            backgroundColor: "#f8f9fa",
            color: "#333"
        }}>
            <h1 style={{ fontSize: "6rem", margin: 0 }}>404</h1>
            <h2 style={{ margin: "1rem 0" }}>Página no encontrada</h2>
            <p>Lo sentimos, la página que buscas no existe.</p>
            <Link to="/" style={{
                marginTop: "1.5rem",
                padding: "0.75rem 1.5rem",
                backgroundColor: "#007bff",
                color: "#fff",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold"
            }}>
                Volver al Dashboard
            </Link>
        </div>
    );
}