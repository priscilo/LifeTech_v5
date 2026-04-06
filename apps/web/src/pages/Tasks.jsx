import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const taskVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.5, ease: "easeOut" },
    }),
};

export default function Tasks() {
    const tasks = [
        { title: "Revisar reportes", status: "Pendiente", color: "bg-primary" },
        { title: "Actualizar presupuesto", status: "En progreso", color: "bg-warning" },
        { title: "Enviar informe", status: "Completado", color: "bg-success" },
    ];

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Tasks</h2>
            <div className="row g-4">
                {tasks.map((task, i) => (
                    <motion.div
                        key={i}
                        className="col-md-4"
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={taskVariants}
                        whileHover={{ scale: 1.05, y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className={`card text-white shadow-lg h-100 ${task.color}`}>
                            <div className="card-body">
                                <h5 className="card-title">{task.title}</h5>
                                <p className="card-text">Estado: {task.status}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
