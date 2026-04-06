import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    root: "./", // asegúrate de que apunta al directorio correcto
    server: {
        port: 5173,
    },
});