// apps/packages/database/db.js
import pkg from "pg";
const { Pool } = pkg;

// Configuración del pool de conexiones
const pool = new Pool({
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "lifetech",
    password: process.env.DB_PASSWORD || "pachi",
    port: process.env.DB_PORT || 5432,
});

// Probar conexión inicial
pool.connect()
    .then(client => {
        console.log("✅ Conexión a PostgreSQL establecida");
        client.release();
    })
    .catch(err => {
        console.error("❌ Error al conectar a PostgreSQL:", err);
    });

export default pool;
