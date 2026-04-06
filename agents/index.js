import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function loadAgents() {

    const entries = fs.readdirSync(__dirname, {
        withFileTypes: true
    });

    for (const entry of entries) {

        if (!entry.isDirectory()) continue;

        const agentEntry = path.join(
            __dirname,
            entry.name,
            "index.js"
        );

        if (!fs.existsSync(agentEntry)) continue;

        console.log("🤖 Loading agent:", entry.name);

        await import(pathToFileURL(agentEntry));
    }

    console.log("✅ All AI Agents Loaded");
}