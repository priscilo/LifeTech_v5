import { subscribeEvent } from "@lifetech/event-bus";

console.log("🧠 Brain Agent online...");

subscribeEvent("user.created", user => {
    console.log("Nuevo usuario:", user.email);
});