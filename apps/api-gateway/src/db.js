// db.js
import pkg from "pg";
const { Pool } = pkg;

// Configuración de conexión a PostgreSQL
const pool = new Pool({
    user: "tu_usuario",        // reemplaza con tu usuario de PostgreSQL
    host: "localhost",         // o la IP/host de tu servidor
    database: "lifetech",   // nombre de tu base de datos
    password: "pachi",   // contraseña de tu usuario
    port: 5432,                // puerto por defecto de PostgreSQL
});

// Probar conexión
pool.connect()
    .then(client => {
        console.log("✅ Conexión a PostgreSQL establecida");
        client.release();
    })
    .catch(err => {
        console.error("❌ Error de conexión a PostgreSQL:", err.stack);
    });

export default pool;
