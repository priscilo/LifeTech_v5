import Redis from "ioredis";

const pub = new Redis("redis://localhost:6379");
const sub = new Redis("redis://localhost:6379");

export async function publishEvent(event, payload) {
    await pub.publish(event, JSON.stringify(payload));
}

export function subscribeEvent(event, handler) {
    sub.subscribe(event);

    sub.on("message", (channel, message) => {
        if (channel === event) {
            handler(JSON.parse(message));
        }
    });
}