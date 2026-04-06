// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
    const location = useLocation();

    const navItems = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Tasks", path: "/tasks" },
        { name: "Finance", path: "/finance" },
        { name: "Login", path: "/login" },
    ];

    const navVariants = {
        hidden: { y: -50, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <motion.nav
            className="bg-gray-800 text-white shadow p-4"
            variants={navVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-xl font-bold">LifeTech v5</div>
                <div className="flex gap-6">
                    {navItems.map((item) => (
                        <motion.div
                            key={item.name}
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <Link
                                to={item.path}
                                className={`hover:text-blue-400 transition-colors ${location.pathname === item.path
                                        ? "text-blue-400 font-semibold"
                                        : ""
                                    }`}
                            >
                                {item.name}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.nav>
    );
}