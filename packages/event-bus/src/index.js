import { redis } from "./redis.js";
import Redis from "ioredis";

export async function publishEvent(channel, payload) {
    await redis.publish(channel, JSON.stringify(payload));
}

export function subscribeEvent(channel, handler) {

    const sub = new Redis(
        process.env.REDIS_URL || "redis://localhost:6379"
    );

    sub.subscribe(channel);

    sub.on("message", (_, message) => {
        handler(JSON.parse(message));
    });
}