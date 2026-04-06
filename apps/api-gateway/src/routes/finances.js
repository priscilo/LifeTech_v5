// routes/finances.js
import express from "express";
import pool from "../db.js"; // tu conexión a PostgreSQL
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM finances ORDER BY id");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error al obtener datos de finances");
    }
});

export default router;
