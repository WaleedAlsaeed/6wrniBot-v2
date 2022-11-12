import { DataBaseEvent } from "../structures/Event"

export default new DataBaseEvent(
    "disconnecting",
    async () => {
        console.log("[DataBase Status]: Disconnecting...")
    }
);