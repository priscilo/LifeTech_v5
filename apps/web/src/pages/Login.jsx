import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login con:", { email, password });
        // Aquí puedes conectar tu API para autenticar
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="container vh-100 d-flex justify-content-center align-items-center"
        >
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-4 fw-bold text-primary"
                >
                    Login - Acceso al sistema
                </motion.h2>

                <form onSubmit={handleSubmit}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-3"
                    >
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="usuario@example.com"
                            required
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mb-3"
                    >
                        <label htmlFor="password" className="form-label">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                            required
                        />
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Entrar
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
}
