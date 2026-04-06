import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
    }),
};

export default function Dashboard() {
    const cards = [
        { title: "Tareas Pendientes", text: "3 tareas por hacer", color: "bg-primary" },
        { title: "Finanzas", text: "$1,200 ingresos este mes", color: "bg-success" },
        { title: "Proyectos", text: "2 proyectos activos", color: "bg-warning" },
        { title: "Alertas", text: "1 notificación nueva", color: "bg-danger" },
    ];

    return (
        <div className="container mt-5">
            <div className="row g-4">
                {cards.map((card, i) => (
                    <motion.div
                        key={i}
                        className="col-md-3"
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className={`card text-white shadow-lg h-100 ${card.color}`}>
                            <div className="card-body">
                                <h5 className="card-title">{card.title}</h5>
                                <p className="card-text">{card.text}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
