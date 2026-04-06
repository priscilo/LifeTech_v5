import { subscribeEvent } from "@lifetech/event-bus";

console.log("🤖 Productivity Agent online");

subscribeEvent("task.created", (event) => {

    console.log("📥 Evento recibido:", event);

    if (event.priority === "high") {
        console.log("🧠 IA → Ejecutar ahora");
    } else {
        console.log("🧠 IA → Programar después");
    }

});