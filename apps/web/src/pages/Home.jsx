// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-xl mb-6 text-gray-300">Página no encontrada</p>
            <Link
                to="/dashboard"
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition-colors"
            >
                Volver al Dashboard
            </Link>
        </motion.div>
    );
}