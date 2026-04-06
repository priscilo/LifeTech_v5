import EventEmitter from "events";

const emitter = new EventEmitter();

/* ======================
   CORE BUS
====================== */

const eventBus = {
    publish(event, payload) {
        console.log(`📡 Event → ${event}`);
        emitter.emit(event, payload);
    },

    subscribe(event, handler) {
        emitter.on(event, handler);
    }
};

/* ======================
   EXPORTS
====================== */

export default eventBus;

export const publishEvent = (event, payload) =>
    eventBus.publish(event, payload);

export const subscribeEvent = (event, handler) =>
    eventBus.subscribe(event, handler);