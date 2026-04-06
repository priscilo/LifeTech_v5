// server.js
import express from "express";
import cors from "cors";
import morgan from "morgan";          // Logger de requests
import dotenv from "dotenv";          // Variables de entorno

import authRoutes from "./routes/auth.routes.js";
import { loadAgents } from "../../../agents/index.js";
import eventBus, { publishEvent } from "@lifetech/event-bus";
import pool from "../../../packages/database/db.js"; // Ajusta la ruta según tu estructura

dotenv.config(); // Cargar variables de entorno desde .env

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // Log de cada request

// Rutas principales
app.use("/api/auth", authRoutes);

app.get("/api/health", (_, res) => {
    res.json({ status: "LifeTech API OK" });
});

/* ===========================
   RUTA FINANCES
=========================== */
app.get("/api/finances", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM finances ORDER BY id");
        res.json(result.rows);
    } catch (err) {
        console.error("❌ Error al obtener finances:", err);
        res.status(500).json({ error: "Error interno" });
    }
});

/* ===========================
   RUTA FINANCES STATS
=========================== */
app.get("/api/finances/stats", async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT 
        ROUND(AVG(ingresos)::numeric, 2) AS avg_ingresos,
        ROUND(MAX(ingresos)::numeric, 2) AS max_ingresos,
        ROUND(MIN(ingresos)::numeric, 2) AS min_ingresos,
        ROUND(AVG(gastos)::numeric, 2) AS avg_gastos,
        ROUND(MAX(gastos)::numeric, 2) AS max_gastos,
        ROUND(MIN(gastos)::numeric, 2) AS min_gastos,
        ROUND(AVG(balance)::numeric, 2) AS avg_balance,
        ROUND(MAX(balance)::numeric, 2) AS max_balance,
        ROUND(MIN(balance)::numeric, 2) AS min_balance
      FROM finances
    `);

        res.json(result.rows[0]);
    } catch (err) {
        console.error("❌ Error al calcular estadísticas:", err);
        res.status(500).json({ error: "Error interno" });
    }
});

/* ===========================
   LIFE TECH AI BOOT
=========================== */
(async () => {
    try {
        await loadAgents();
        console.log("🧠 LifeTech AI System Online");
    } catch (err) {
        console.error("❌ Error al cargar agentes:", err);
        process.exit(1); // detener si falla el boot crítico
    }
})();

/* ===========================
   TASKS ENDPOINT
=========================== */
app.post("/api/tasks", async (req, res) => {
    try {
        const task = req.body;
        console.log("📌 Task received:", task);

        await eventBus.publish("task.created", task);

        res.json({ ok: true });
    } catch (err) {
        console.error("❌ Error al publicar tarea:", err);
        res.status(500).json({ ok: false, error: "Error interno" });
    }
});

/* ===========================
   TEST EVENT ENDPOINT
=========================== */
app.post("/api/test-event", async (_, res) => {
    try {
        await publishEvent("task.created", {
            userId: 1,
            title: "Nueva tarea creada",
        });

        res.json({ ok: true });
    } catch (err) {
        console.error("❌ Error al publicar evento de prueba:", err);
        res.status(500).json({ ok: false, error: "Error interno" });
    }
});

// Puerto configurable vía .env
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`🚀 API Gateway running on port ${PORT}`);
});
