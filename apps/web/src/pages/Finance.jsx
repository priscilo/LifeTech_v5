import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const financeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
};

export default function Finance() {
    const [finances, setFinances] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const endpoint = "http://localhost:4000/api/finances";
        const statsEndpoint = "http://localhost:4000/api/finances/stats";

        Promise.all([
            fetch(endpoint).then(res => res.json()),
            fetch(statsEndpoint).then(res => res.json())
        ])
            .then(([financesData, statsData]) => {
                setFinances(financesData);
                setStats(statsData);
                setLoading(false);
            })
            .catch(err => {
                console.error("❌ Error al cargar datos:", err);
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center mt-5">⏳ Cargando datos financieros...</p>;
    if (error) return <p className="text-center mt-5">❌ Error: {error.message}</p>;
    if (!finances.length) return <p className="text-center mt-5">⚠️ No hay datos financieros disponibles.</p>;

    // Tarjetas resumen del último mes
    const lastMonth = finances[finances.length - 1];
    const cards = [
        { title: "Ingresos", value: `$${lastMonth.ingresos}`, description: lastMonth.month, color: "bg-success" },
        { title: "Gastos", value: `$${lastMonth.gastos}`, description: lastMonth.month, color: "bg-danger" },
        { title: "Balance", value: `$${lastMonth.balance}`, description: "neto", color: "bg-primary" },
        { title: "Proyección", value: `$${lastMonth.proyeccion}`, description: "próximo mes", color: "bg-warning" },
    ];

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">📊 Finance Dashboard</h2>

            {/* KPIs */}
            {stats && (
                <div className="row g-4 mb-5">
                    <motion.div className="col-md-4" initial="hidden" animate="visible" variants={financeVariants}>
                        <div className="card bg-light shadow-lg h-100">
                            <div className="card-body text-center">
                                <h5 className="card-title">Promedio Ingresos</h5>
                                <h3 className="fw-bold text-success">${stats.avg_ingresos}</h3>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div className="col-md-4" initial="hidden" animate="visible" variants={financeVariants}>
                        <div className="card bg-light shadow-lg h-100">
                            <div className="card-body text-center">
                                <h5 className="card-title">Promedio Gastos</h5>
                                <h3 className="fw-bold text-danger">${stats.avg_gastos}</h3>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div className="col-md-4" initial="hidden" animate="visible" variants={financeVariants}>
                        <div className="card bg-light shadow-lg h-100">
                            <div className="card-body text-center">
                                <h5 className="card-title">Promedio Balance</h5>
                                <h3 className="fw-bold text-primary">${stats.avg_balance}</h3>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Tarjetas último mes */}
            <div className="row g-4 mb-5">
                {cards.map((card, i) => (
                    <motion.div
                        key={i}
                        className="col-md-3"
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={financeVariants}
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className={`card text-white shadow-lg h-100 ${card.color}`}>
                            <div className="card-body text-center">
                                <h5 className="card-title">{card.title}</h5>
                                <h3 className="fw-bold">{card.value}</h3>
                                <p className="card-text">{card.description}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Gráfico de líneas */}
            <h4 className="text-center mb-3">📈 Evolución mensual</h4>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={finances} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ingresos" stroke="#28a745" name="Ingresos" />
                    <Line type="monotone" dataKey="gastos" stroke="#dc3545" name="Gastos" />
                    <Line type="monotone" dataKey="balance" stroke="#007bff" name="Balance" />
                </LineChart>
            </ResponsiveContainer>

            {/* Gráfico de barras */}
            <h4 className="text-center mt-5 mb-3">📊 Comparación mensual</h4>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={finances} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ingresos" fill="#28a745" name="Ingresos" />
                    <Bar dataKey="gastos" fill="#dc3545" name="Gastos" />
                    <Bar dataKey="balance" fill="#007bff" name="Balance" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
