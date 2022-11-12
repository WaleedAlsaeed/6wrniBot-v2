"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataBaseEvent = exports.Event = void 0;
class Event {
    constructor(event, run) {
        this.event = event;
        this.run = run;
    }
}
exports.Event = Event;
class DataBaseEvent {
    constructor(event, run) {
        this.event = event;
        this.run = run;
    }
}
exports.DataBaseEvent = DataBaseEvent;
